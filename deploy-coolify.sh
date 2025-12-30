#!/bin/bash

# Coolify Deployment Script for Priya Herbal E-commerce Platform

set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting Priya Herbal deployment to Coolify..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create a .env file with all required environment variables."
    echo "📋 Required environment variables:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
    echo "   - NEXT_PUBLIC_CASHFREE_CLIENT_ID"
    echo "   - NEXT_PUBLIC_CASHFREE_CLIENT_SECRET"
    echo "   - NEXT_PUBLIC_CASHFREE_MODE"
    echo "   - RESEND_API_KEY"
    echo "   - FROM_EMAIL"
    echo "   - DB_PASSWORD"
    echo "   - NEXTAUTH_SECRET"
    echo "   - NEXTAUTH_URL"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Build the Docker images
echo "🏗️ Building Docker images..."
docker-compose build

# Start the services
echo "🐳 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check if the application is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running successfully!"
    echo "🌐 Your application should be available at http://localhost:3000"
    
    # Check the application logs
    echo "📋 Application logs:"
    docker-compose logs app
else
    echo "❌ Something went wrong. Services are not running properly."
    docker-compose ps
    exit 1
fi

# Run database initialization
echo "💾 Running database initialization..."
docker-compose exec init-db bash -c "
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

echo "🎉 Deployment completed successfully!"
echo ""
echo "📊 Application Information:"
echo "   - Application URL: http://localhost:3000"
echo "   - Database: PostgreSQL on localhost:5432"
echo "   - Database Name: priya_herbal"
echo "   - Database User: priya_user"
echo ""
echo "🔧 Management Commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop services: docker-compose down"
echo "   - Restart services: docker-compose restart"
echo "   - Execute command in app: docker-compose exec app bash"
echo ""
echo "🔐 Security Notes:"
echo "   - Change the default database password in .env file"
echo "   - Use strong, unique API keys for all services"
echo "   - Enable SSL in your Coolify instance"
echo "   - Regularly backup your database"
echo ""
echo "📈 Monitoring:"
echo "   - Check application health: docker-compose ps"
echo "   - Monitor logs: docker-compose logs -f app"
echo "   - Database logs: docker-compose logs -f db"
echo ""
echo "💡 For Coolify deployment:"
echo "   1. Upload this entire project to your Git repository"
echo "   2. In Coolify, create a new Docker Compose application"
echo "   3. Point to your Git repository"
echo "   4. Add the environment variables from your .env file"
echo "   5. Use the docker-compose.yml file in this project"
echo "   6. Deploy!"