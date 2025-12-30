# Complete Setup Guide for Priya Herbal E-commerce Platform

This guide provides comprehensive instructions for setting up the Priya Herbal e-commerce platform for development, testing, and production deployment.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Development Setup](#development-setup)
3. [Production Setup](#production-setup)
4. [Database Initialization](#database-initialization)
5. [Environment Variables](#environment-variables)
6. [Payment Gateway Integration](#payment-gateway-integration)
7. [Authentication Setup](#authentication-setup)
8. [Docker Deployment](#docker-deployment)
9. [Coolify Deployment](#coolify-deployment)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- Node.js 18+ 
- pnpm package manager
- Docker and Docker Compose
- Git
- PostgreSQL (for local development, optional)

### Recommended Environment
- OS: macOS, Linux, or Windows with WSL2
- RAM: 8GB or more
- Disk Space: 5GB available

## Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/happies2012-cpu/priya-herbal.git
cd priya-herbal
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cashfree Payment Gateway
NEXT_PUBLIC_CASHFREE_CLIENT_ID=your_cashfree_client_id
NEXT_PUBLIC_CASHFREE_CLIENT_SECRET=your_cashfree_client_secret
NEXT_PUBLIC_CASHFREE_MODE=sandbox

# Email Configuration
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_from_email

# Authentication Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# AI Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key
```

### 4. Run the Development Server
```bash
# Start the development server
pnpm dev

# Or with npm
npm run dev

# The application will be available at http://localhost:3000
```

## Production Setup

### 1. Build the Application
```bash
# Build for production
pnpm build

# Or with npm
npm run build
```

### 2. Start the Production Server
```bash
# Start the production server
pnpm start

# Or with npm
npm run start
```

## Database Initialization

### Manual Database Setup
If you're not using the Docker setup, you'll need to manually set up your database:

1. Create a PostgreSQL database
2. Run the initialization scripts in order:
   - `scripts/001_create_tables.sql`
   - `scripts/002_seed_products.sql`
   - `scripts/003_enhanced_affiliate_tables.sql`
   - `scripts/004_seed_affiliate_data.sql`

### Using Prisma (Alternative)
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database
npx prisma db seed
```

## Environment Variables

### Required Variables

#### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (keep secret)

#### Cashfree Payment Gateway
- `NEXT_PUBLIC_CASHFREE_CLIENT_ID`: Cashfree client ID
- `NEXT_PUBLIC_CASHFREE_CLIENT_SECRET`: Cashfree client secret (keep secret)
- `NEXT_PUBLIC_CASHFREE_MODE`: Either `sandbox` or `production`

#### Email Configuration
- `RESEND_API_KEY`: Resend API key
- `FROM_EMAIL`: Email address to send emails from

#### Authentication Configuration
- `NEXTAUTH_SECRET`: Secret for NextAuth.js (use a random string)
- `NEXTAUTH_URL`: URL of your application

### Optional Variables
- `OPENAI_API_KEY`: For AI features
- `NODE_ENV`: Set to `production` for production environments

## Payment Gateway Integration

### Cashfree Setup
1. Create an account at Cashfree
2. Get your client ID and secret
3. For testing, use sandbox mode
4. For production, switch to production mode
5. Configure webhooks for payment notifications

### Payment Flow
1. User initiates payment on frontend
2. Payment request sent to Cashfree
3. User completes payment
4. Cashfree sends webhook notification
5. Application processes payment confirmation

## Authentication Setup

### Supabase Authentication
1. Create a Supabase project
2. Configure email authentication
3. Set up email templates
4. Configure security rules

### Supported Authentication Methods
- Email/password
- Social login (Google, Facebook, etc.)

## Docker Deployment

### Prerequisites
- Docker 20+ 
- Docker Compose 1.29+

### Build and Run
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Access the application at http://localhost:3000
```

### Docker Compose Services
- `app`: Next.js application
- `db`: PostgreSQL database
- `init-db`: Database initialization

### Docker Environment Variables
Create a `.env` file for Docker with the same variables as above plus:
- `DB_PASSWORD`: Database password

## Coolify Deployment

### Prerequisites
- Coolify server instance
- Domain name pointing to Coolify server

### Deployment Steps
1. Create a new Docker Compose application in Coolify
2. Point to this Git repository
3. Add all environment variables
4. Use the provided `docker-compose.yml`
5. Deploy the application

### Post-Deployment
1. Configure SSL certificate
2. Set up domain
3. Configure backups
4. Set up monitoring

## Troubleshooting

### Common Issues

#### Build Errors
- Ensure all dependencies are installed
- Check Node.js version compatibility
- Verify environment variables are set correctly

#### Database Connection Issues
- Verify database URL and credentials
- Check if database service is running
- Ensure firewall rules allow connections

#### Payment Gateway Issues
- Verify Cashfree credentials
- Check webhook configuration
- Ensure correct mode (sandbox vs production)

#### Authentication Issues
- Verify Supabase configuration
- Check if email templates are set up
- Ensure security rules are properly configured

### Development Commands

#### Useful Scripts
```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Docker build
pnpm docker:build

# Docker run
pnpm docker:run

# Docker development
pnpm docker:dev

# Docker production
pnpm docker:prod
```

#### Docker Commands
```bash
# View logs
docker-compose logs -f

# View service status
docker-compose ps

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Execute command in container
docker-compose exec app bash
```

## Security Best Practices

1. Never commit secrets to version control
2. Use strong, unique passwords
3. Enable SSL/TLS
4. Regularly update dependencies
5. Monitor for security vulnerabilities
6. Implement proper input validation
7. Use environment variables for secrets
8. Regularly backup data

## Performance Optimization

1. Enable Next.js static optimization
2. Use image optimization
3. Implement caching strategies
4. Optimize database queries
5. Use CDN for static assets
6. Implement lazy loading
7. Minimize bundle size

## Monitoring and Maintenance

### Logging
- Application logs
- Database logs
- Error tracking
- Performance metrics

### Backups
- Database backups
- File storage backups
- Configuration backups
- Version control

### Updates
- Dependency updates
- Security patches
- Feature updates
- Performance improvements