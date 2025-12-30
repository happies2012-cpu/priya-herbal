# Priya Herbal - Complete E-commerce Platform

A premium Indian herbal e-commerce platform featuring glassy UI, AI recommendations, and comprehensive admin tools.

## 🌿 Features

- **Glassy UI Design**: Frosted glass cards with backdrop blur effects
- **Product Catalog**: 50+ herbal products with variants and detailed descriptions
- **AI Integration**: AI-powered product recommendations and chat assistant
- **Authentication**: Supabase Auth with email verification
- **Payments**: Cashfree payment gateway integration (UPI, Cards, Net Banking)
- **Admin Dashboard**: Order & inventory management
- **Affiliate Program**: Affiliate dashboard and tracking
- **Responsive Design**: Mobile-first approach

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with glassy morphism effects
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Payments**: Cashfree Payment Gateway
- **Deployment**: Docker containerization
- **Animations**: Framer Motion for fluid interactions

## 🚀 One-Click Docker Deployment to Coolify

### Prerequisites

- Docker & Docker Compose
- Coolify server instance

### Quick Deployment Steps

1. Clone this repository
2. In your Coolify instance, create a new application
3. Select "Docker" as the application type
4. Point to this repository
5. Use the provided `docker-compose.yml` file
6. Add the environment variables as described below
7. Deploy!

### Environment Variables

Create a `.env` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cashfree Payment Gateway
NEXT_PUBLIC_CASHFREE_CLIENT_ID=your_cashfree_client_id
NEXT_PUBLIC_CASHFREE_CLIENT_SECRET=your_cashfree_client_secret
NEXT_PUBLIC_CASHFREE_MODE=your_cashfree_mode

# Email Configuration
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_from_email

# AI Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key

# Other Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_nextauth_url
```

### Docker Compose Configuration

The project includes a `docker-compose.yml` file that handles:

- Application container
- Database initialization
- Environment configuration
- Volume mounting for persistent data

### Database Setup

The Docker setup automatically:
1. Creates the required PostgreSQL database
2. Runs all database migration scripts
3. Seeds initial data including products and categories
4. Sets up proper relationships and constraints

### Payment Gateway Integration

All payment gateways (Cashfree) are pre-configured in the Docker setup:
- Payment processing endpoints
- Webhook handling
- Transaction management
- Refund processing

## 🏗️ Project Structure

```
priya-herbal/
├── app/                    # Next.js App Router pages
├── components/            # React components
├── lib/                   # Utility functions and API clients
├── scripts/               # Database initialization scripts
├── styles/                # Global styles
├── Dockerfile             # Application Dockerfile
├── docker-compose.yml     # Multi-container setup
└── ...
```

## 📦 Included Components

### Frontend Components
- Hero Section with slider
- Featured Products
- Testimonials Slider
- Trust Badges
- WhatsApp Widget
- Product Cards
- Image Carousel
- Reviews Section
- AI Recommendations
- Chat Assistant

### Backend Services
- Authentication API
- Product Management
- Order Processing
- Payment Integration
- Affiliate Tracking
- Email Notifications

### Admin Features
- Dashboard
- Product Management
- Order Management
- User Management
- Analytics
- Affiliate Management

## 🔧 Development Setup

For local development:

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# The app will be available at http://localhost:3000
```

## 🐳 Docker Development

For Docker-based development:

```bash
# Build and run the application
docker-compose up --build

# Access the application at http://localhost:3000
```

## 🚢 Production Deployment

### Coolify Deployment Steps:

1. **Create Coolify Account** (if not already done)
2. **Add your Git repository**
3. **Select "Docker App"**
4. **Configure Environment Variables** (see above)
5. **Set up Database** (PostgreSQL 15+)
6. **Deploy Application**
7. **Configure Domain** (optional)
8. **Enable SSL** (optional)

### Post-Deployment Configuration:

1. Run database initialization script
2. Verify payment gateway connections
3. Test email delivery
4. Set up monitoring
5. Configure backups

## 🛡️ Security Features

- Supabase Row Level Security (RLS)
- JWT-based authentication
- Environment variable encryption
- Secure payment processing
- Input validation and sanitization

## 📊 Performance Optimizations

- Next.js Image Optimization
- Static Site Generation (SSG)
- Server-Side Rendering (SSR)
- Incremental Static Regeneration (ISR)
- API Route Caching
- Database Query Optimization

## 🔄 CI/CD Pipeline

The Docker setup includes:
- Automated testing
- Build optimization
- Environment-specific configurations
- Rollback capabilities

## 📞 Support

For support and questions:
- Check the documentation
- Open an issue in the repository
- Contact the development team

## 📄 License

This project is licensed under the MIT License.