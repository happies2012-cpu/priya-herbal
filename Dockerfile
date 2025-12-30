# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Install bash (often needed for build scripts)
RUN apk add --no-cache bash libc6-compat python3 make g++

# Set environment variables
ENV NODE_ENV=production

# Install pnpm globally
RUN npm install -g pnpm

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN pnpm run build

# Expose port
EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["pnpm", "start"]