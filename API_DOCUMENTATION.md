# Priya Herbal API Documentation

## Overview

The Priya Herbal platform provides a comprehensive API for managing products, orders, users, and other e-commerce functionality. This documentation covers all available endpoints and their usage.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://yourdomain.com/api`

## Authentication

Most API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer {your-jwt-token}
```

Some endpoints are public and don't require authentication.

## API Endpoints

### Products

#### GET `/api/products`
Get a list of all products with filtering and pagination options.

**Query Parameters:**
- `limit` (optional): Number of products to return (default: 20, max: 100)
- `offset` (optional): Number of products to skip
- `category` (optional): Filter by category
- `search` (optional): Search term for product name/description
- `sort` (optional): Sort by `name`, `price`, `created_at` (default: `created_at`)
- `order` (optional): Sort order `asc` or `desc` (default: `desc`)

**Response:**
```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "images": ["string"],
      "inStock": "boolean",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "total": "number",
  "hasMore": "boolean"
}
```

#### GET `/api/products/[id]`
Get a specific product by ID.

**Response:**
```json
{
  "product": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "images": ["string"],
    "inStock": "boolean",
    "variants": [
      {
        "id": "string",
        "name": "string",
        "price": "number",
        "sku": "string",
        "inStock": "boolean"
      }
    ],
    "reviews": [
      {
        "id": "string",
        "userId": "string",
        "rating": "number",
        "comment": "string",
        "createdAt": "string"
      }
    ],
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### GET `/api/products/categories`
Get all product categories.

**Response:**
```json
{
  "categories": [
    {
      "id": "string",
      "name": "string",
      "slug": "string",
      "description": "string"
    }
  ]
}
```

### Authentication

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "emailVerified": "boolean"
  },
  "token": "string"
}
```

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "emailVerified": "boolean"
  }
}
```

#### POST `/api/auth/forgot-password`
Request password reset.

**Request Body:**
```json
{
  "email": "string"
}
```

**Response:**
```json
{
  "message": "Password reset email sent"
}
```

#### POST `/api/auth/reset-password`
Reset password with token.

**Request Body:**
```json
{
  "token": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

### Cart

#### GET `/api/cart`
Get the current user's cart.

**Requires Authentication**

**Response:**
```json
{
  "cart": {
    "id": "string",
    "items": [
      {
        "id": "string",
        "productId": "string",
        "variantId": "string",
        "quantity": "number",
        "price": "number",
        "product": {
          "id": "string",
          "name": "string",
          "image": "string"
        }
      }
    ],
    "total": "number",
    "itemCount": "number"
  }
}
```

#### POST `/api/cart/add`
Add an item to the cart.

**Requires Authentication**

**Request Body:**
```json
{
  "productId": "string",
  "variantId": "string",
  "quantity": "number"
}
```

**Response:**
```json
{
  "message": "Item added to cart",
  "cart": {
    "id": "string",
    "items": [...],
    "total": "number",
    "itemCount": "number"
  }
}
```

#### PUT `/api/cart/update`
Update cart item quantity.

**Requires Authentication**

**Request Body:**
```json
{
  "itemId": "string",
  "quantity": "number"
}
```

**Response:**
```json
{
  "message": "Cart updated",
  "cart": {
    "id": "string",
    "items": [...],
    "total": "number",
    "itemCount": "number"
  }
}
```

#### DELETE `/api/cart/remove`
Remove an item from the cart.

**Requires Authentication**

**Request Body:**
```json
{
  "itemId": "string"
}
```

**Response:**
```json
{
  "message": "Item removed from cart",
  "cart": {
    "id": "string",
    "items": [...],
    "total": "number",
    "itemCount": "number"
  }
}
```

### Orders

#### GET `/api/orders`
Get the current user's orders.

**Requires Authentication**

**Response:**
```json
{
  "orders": [
    {
      "id": "string",
      "status": "string",
      "total": "number",
      "items": [...],
      "shippingAddress": {},
      "paymentMethod": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### GET `/api/orders/[id]`
Get a specific order.

**Requires Authentication**

**Response:**
```json
{
  "order": {
    "id": "string",
    "status": "string",
    "total": "number",
    "items": [
      {
        "id": "string",
        "productId": "string",
        "variantId": "string",
        "quantity": "number",
        "price": "number",
        "product": {
          "id": "string",
          "name": "string",
          "image": "string"
        }
      }
    ],
    "shippingAddress": {
      "name": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "paymentMethod": "string",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### POST `/api/orders/create`
Create a new order.

**Requires Authentication**

**Request Body:**
```json
{
  "shippingAddress": {
    "name": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "paymentMethod": "string",
  "paymentData": {}
}
```

**Response:**
```json
{
  "order": {
    "id": "string",
    "status": "string",
    "total": "number",
    "items": [...],
    "shippingAddress": {},
    "paymentMethod": "string",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Payments

#### POST `/api/payments/cashfree/initiate`
Initiate a Cashfree payment.

**Requires Authentication**

**Request Body:**
```json
{
  "orderId": "string",
  "amount": "number",
  "currency": "string",
  "customer": {
    "id": "string",
    "email": "string",
    "name": "string",
    "phone": "string"
  }
}
```

**Response:**
```json
{
  "paymentId": "string",
  "paymentUrl": "string",
  "orderId": "string"
}
```

#### POST `/api/payments/cashfree/webhook`
Cashfree webhook endpoint (for internal use).

### Reviews

#### GET `/api/reviews/product/[productId]`
Get reviews for a specific product.

**Response:**
```json
{
  "reviews": [
    {
      "id": "string",
      "productId": "string",
      "userId": "string",
      "user": {
        "name": "string"
      },
      "rating": "number",
      "comment": "string",
      "createdAt": "string"
    }
  ],
  "averageRating": "number",
  "totalReviews": "number"
}
```

#### POST `/api/reviews`
Create a new review.

**Requires Authentication**

**Request Body:**
```json
{
  "productId": "string",
  "rating": "number",
  "comment": "string"
}
```

**Response:**
```json
{
  "review": {
    "id": "string",
    "productId": "string",
    "userId": "string",
    "rating": "number",
    "comment": "string",
    "createdAt": "string"
  }
}
```

### Users

#### GET `/api/users/me`
Get current user information.

**Requires Authentication**

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "emailVerified": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### PUT `/api/users/me`
Update current user information.

**Requires Authentication**

**Request Body:**
```json
{
  "name": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "emailVerified": "boolean"
  }
}
```

### Affiliate Program

#### GET `/api/affiliate/dashboard`
Get affiliate dashboard data.

**Requires Authentication**

**Response:**
```json
{
  "stats": {
    "totalReferrals": "number",
    "totalCommission": "number",
    "pendingCommission": "number",
    "paidCommission": "number",
    "conversionRate": "number"
  },
  "referrals": [
    {
      "id": "string",
      "userId": "string",
      "orderId": "string",
      "commission": "number",
      "status": "string",
      "createdAt": "string"
    }
  ]
}
```

#### GET `/api/affiliate/link`
Get the user's affiliate link.

**Requires Authentication**

**Response:**
```json
{
  "affiliateLink": "string"
}
```

### Search

#### GET `/api/search`
Search across products and content.

**Query Parameters:**
- `q`: Search query
- `type`: Search type (products, articles, etc.)

**Response:**
```json
{
  "results": [
    {
      "type": "string",
      "id": "string",
      "title": "string",
      "description": "string",
      "url": "string",
      "score": "number"
    }
  ]
}
```

## Error Handling

All API endpoints return standardized error responses:

```json
{
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "status": "number"
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per minute per IP for public endpoints
- 200 requests per minute per authenticated user
- 1000 requests per minute for admin endpoints

## Versioning

The API uses URL versioning. Current version is v1:
- Base URL: `/api/v1/{endpoint}`

Future versions will be released as `/api/v2/`, etc.

## SDKs and Libraries

The API can be accessed using various SDKs and libraries:
- JavaScript/Node.js SDK
- Python SDK
- Mobile SDKs for iOS and Android
- REST API with standard HTTP clients

## Webhooks

The system can send webhooks for important events:
- Order status changes
- Payment confirmations
- New reviews
- Inventory updates

Configure webhook endpoints in the admin panel.

## Testing

For testing purposes, use the sandbox environment with test credentials.