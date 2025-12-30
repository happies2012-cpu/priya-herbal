# Environment Variables for Priya Herbal E-commerce Platform

This document describes all environment variables required for the Priya Herbal e-commerce platform.

## 🌐 Supabase Configuration

### NEXT_PUBLIC_SUPABASE_URL
- **Type**: String
- **Required**: Yes
- **Description**: Your Supabase project URL
- **Example**: `https://your-project.supabase.co`

### NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Type**: String
- **Required**: Yes
- **Description**: Your Supabase anonymous key for client-side operations
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### SUPABASE_SERVICE_ROLE_KEY
- **Type**: String
- **Required**: Yes
- **Description**: Your Supabase service role key for server-side operations (must be kept secret)
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 💳 Cashfree Payment Gateway

### NEXT_PUBLIC_CASHFREE_CLIENT_ID
- **Type**: String
- **Required**: Yes
- **Description**: Cashfree client ID for payment processing
- **Example**: `your_cashfree_client_id`

### NEXT_PUBLIC_CASHFREE_CLIENT_SECRET
- **Type**: String
- **Required**: Yes
- **Description**: Cashfree client secret for payment processing (must be kept secret)
- **Example**: `your_cashfree_client_secret`

### NEXT_PUBLIC_CASHFREE_MODE
- **Type**: String
- **Required**: Yes
- **Description**: Cashfree mode (either 'sandbox' for testing or 'production' for live)
- **Values**: `sandbox` or `production`
- **Example**: `sandbox`

## 📧 Email Configuration

### RESEND_API_KEY
- **Type**: String
- **Required**: Yes
- **Description**: API key for Resend email service
- **Example**: `re_123456789012345678901234567890`

### FROM_EMAIL
- **Type**: String
- **Required**: Yes
- **Description**: Email address to send emails from
- **Example**: `noreply@yourdomain.com`

## 🔐 Authentication Configuration

### NEXTAUTH_SECRET
- **Type**: String
- **Required**: Yes
- **Description**: Secret for NextAuth.js JWT encryption (must be kept secret)
- **Example**: `your_randomly_generated_secret`

### NEXTAUTH_URL
- **Type**: String
- **Required**: Yes
- **Description**: URL of your deployed application
- **Example**: `https://yourdomain.com` or `http://localhost:3000`

## 🤖 AI Configuration (Optional)

### OPENAI_API_KEY
- **Type**: String
- **Required**: No (only needed for AI features)
- **Description**: API key for OpenAI services
- **Example**: `sk-1234567890abcdef1234567890abcdef`

## 🗄️ Database Configuration

### DB_PASSWORD
- **Type**: String
- **Required**: Yes (for Docker deployment)
- **Description**: Password for the PostgreSQL database
- **Example**: `your_secure_database_password`

## 🌍 Other Environment Variables

### NODE_ENV
- **Type**: String
- **Required**: No
- **Description**: Node.js environment mode
- **Values**: `development`, `production`, or `test`
- **Default**: `production`

## 📋 Complete .env Example

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cashfree Payment Gateway
NEXT_PUBLIC_CASHFREE_CLIENT_ID=your_cashfree_client_id
NEXT_PUBLIC_CASHFREE_CLIENT_SECRET=your_cashfree_client_secret
NEXT_PUBLIC_CASHFREE_MODE=production

# Email Configuration
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Authentication Configuration
NEXTAUTH_SECRET=your_randomly_generated_secret
NEXTAUTH_URL=https://yourdomain.com

# AI Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key

# Database Configuration (for Docker)
DB_PASSWORD=your_secure_database_password

# Node Environment
NODE_ENV=production
```

## 🛡️ Security Best Practices

1. **Never commit .env files** to version control
2. **Use strong, unique values** for all secrets
3. **Rotate keys regularly** for security
4. **Use different values** for development and production
5. **Restrict access** to environment variables
6. **Monitor usage** of API keys

## 🚀 For Coolify Deployment

When deploying to Coolify:

1. Add these environment variables in the Coolify application settings
2. Do NOT include them in your repository
3. Use Coolify's secure environment variable storage
4. Ensure all required variables are set before deployment