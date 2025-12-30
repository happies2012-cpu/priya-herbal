# Coolify Deployment Guide for Priya Herbal

This guide provides step-by-step instructions to deploy your Priya Herbal e-commerce platform to Coolify with a complete one-click setup.

## 🎯 Overview

This deployment creates a complete, production-ready e-commerce platform with:
- Next.js application
- PostgreSQL database
- Automated database initialization
- Payment gateway integration
- Email service
- SSL certificate
- Environment management
- Backup configuration

## 📋 Prerequisites

- Coolify server (v2.5+) running on a VPS or dedicated server
- Domain name pointing to your Coolify server
- Docker and Docker Compose installed on Coolify server

## 🚀 One-Click Deployment Setup

### Step 1: Prepare Your Coolify Server

1. Install Coolify on your server (if not already done):
   ```bash
   curl -fsSL https://get.coollabs.io/coolify/install.sh -o install.sh
   sh install.sh
   ```

2. Access your Coolify dashboard at `https://your-server-ip`

### Step 2: Create Database Server

1. In Coolify dashboard, go to **Servers**
2. Add your server if not already added
3. Go to **Databases** → **PostgreSQL**
4. Create a new PostgreSQL 15+ database server
5. Note the database server connection details

### Step 3: Create Docker Compose Application

1. In Coolify dashboard, go to **Applications**
2. Click **Create Application**
3. Select **Docker Compose** as the application type
4. Choose your server
5. Name your application (e.g., "priya-herbal")

### Step 4: Configure the Docker Compose

Replace the default docker-compose.yml with the following configuration:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: priya-herbal-app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - NEXT_PUBLIC_CASHFREE_CLIENT_ID=${NEXT_PUBLIC_CASHFREE_CLIENT_ID}
      - NEXT_PUBLIC_CASHFREE_CLIENT_SECRET=${NEXT_PUBLIC_CASHFREE_CLIENT_SECRET}
      - NEXT_PUBLIC_CASHFREE_MODE=${NEXT_PUBLIC_CASHFREE_MODE}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - FROM_EMAIL=${FROM_EMAIL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    ports:
      - "3000:3000"
    depends_on:
      - db
    volumes:
      - /app/node_modules
      - /app/.next
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    container_name: priya-herbal-db
    restart: unless-stopped
    environment:
      - POSTGRES_DB=priya_herbal
      - POSTGRES_USER=priya_user
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts:/docker-entrypoint-initdb.d
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U priya_user -d priya_herbal"]
      interval: 10s
      timeout: 5s
      retries: 5

  init-db:
    image: postgres:15-alpine
    container_name: priya-herbal-init-db
    restart: "no"
    environment:
      - PGPASSWORD=${DB_PASSWORD}
    command: >
      bash -c "
        until pg_isready -h db -p 5432 -U priya_user;
        do
          echo 'Waiting for database connection...';
          sleep 2;
        done;
        echo 'Database connected. Running initialization scripts...';
        psql -h db -U priya_user -d priya_herbal -f /scripts/001_create_tables.sql;
        psql -h db -U priya_user -d priya_herbal -f /scripts/002_seed_products.sql;
        psql -h db -U priya_user -d priya_herbal -f /scripts/003_enhanced_affiliate_tables.sql;
        psql -h db -U priya_user -d priya_herbal -f /scripts/004_seed_affiliate_data.sql;
        echo 'Database initialization completed.';
      "
    volumes:
      - ./scripts:/scripts
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
```

### Step 5: Create Dockerfile

Create a `Dockerfile` in your project root:

```Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and build the application
RUN pnpm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for the static files
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

### Step 6: Set Environment Variables

In the Coolify application configuration, add the following environment variables:

#### Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_CASHFREE_CLIENT_ID=your_cashfree_client_id
NEXT_PUBLIC_CASHFREE_CLIENT_SECRET=your_cashfree_client_secret
NEXT_PUBLIC_CASHFREE_MODE=your_cashfree_mode
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_from_email
DB_PASSWORD=your_secure_db_password
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://yourdomain.com
```

#### Optional Variables:
```
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
```

### Step 7: Configure Build Settings

In Coolify, set the following build settings:
- Build Directory: `/`
- Build Context: `/`
- Dockerfile Path: `Dockerfile`

### Step 8: Deploy

1. Click **Deploy** in Coolify
2. Monitor the deployment logs
3. Wait for all services to start successfully

## 🔧 Post-Deployment Configuration

### Database Initialization

The `init-db` service will automatically:
1. Wait for PostgreSQL to be ready
2. Execute all database initialization scripts
3. Seed initial data (products, categories, etc.)
4. Complete the setup process

### SSL Configuration

1. In Coolify, go to your application
2. Click on **SSL** tab
3. Add your domain name
4. Select **Let's Encrypt** for automatic SSL certificate
5. Save and apply configuration

### Domain Configuration

1. Point your domain's A record to your Coolify server IP
2. In Coolify, add the domain to your application
3. Configure SSL as described above

## 🛠️ Troubleshooting

### Common Issues:

1. **Database Connection Timeout**:
   - Ensure the database service is running
   - Check that environment variables are correctly set

2. **Build Failures**:
   - Verify all dependencies are correctly specified
   - Check that the Dockerfile is properly configured

3. **Environment Variables Not Loading**:
   - Confirm all variables are set in Coolify
   - Verify variable names match those in your application

### Health Checks:

The deployment includes health checks for:
- Database connectivity
- Application startup
- Service dependencies

## 📊 Monitoring and Maintenance

### Logs:
- Access application logs in Coolify dashboard
- Monitor database logs separately
- Set up alerts for critical errors

### Backups:
- Configure automated database backups in Coolify
- Set up application backup schedules
- Test backup restoration procedures

### Updates:
- Update the application by pushing to your Git repository
- Coolify can be configured for automatic deployments
- Always test updates in a staging environment first

## 🚀 Scaling

### Horizontal Scaling:
- Coolify supports multiple instances of your application
- Configure load balancing as needed
- Monitor resource usage for scaling decisions

### Database Scaling:
- Monitor database performance
- Consider read replicas for high-traffic scenarios
- Optimize queries for better performance

## 🛡️ Security Best Practices

1. **Environment Variables**: Never expose secrets in code
2. **Database Access**: Use strong passwords and limit access
3. **SSL/TLS**: Always use HTTPS for production
4. **Updates**: Keep dependencies updated
5. **Monitoring**: Set up security monitoring

## 📞 Support

For deployment issues:
- Check Coolify documentation
- Review application logs
- Verify environment configuration
- Contact Coolify support if needed

## 🔄 Rollback Procedure

To rollback to a previous version:
1. In Coolify, go to your application
2. Go to the **Deployments** tab
3. Select the previous successful deployment
4. Click **Rollback**

## 📈 Performance Optimization

The Docker setup includes optimizations for:
- Fast startup times
- Efficient memory usage
- Optimized build process
- Caching strategies
- Database connection pooling