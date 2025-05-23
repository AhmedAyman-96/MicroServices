# Blog Platform

A microservices-based blog platform built with TypeScript, Express, MongoDB, and Docker.

## Architecture

The platform consists of two main microservices:

1. **User Service** (Port 5000)

   - User registration and authentication
   - Profile management
   - JWT-based authentication

2. **Blog Service** (Port 5001)
   - Blog post CRUD operations
   - Tag-based organization
   - Author association

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB (or use the Docker container)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/AhmedAyman-96/MicroServices.git
cd MicroServices
```

2. Start the services using Docker Compose:

```bash
docker-compose up --build
```

This will start:

- MongoDB container
- User Service container
- Blog Service container

## API Documentation

### User Service

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Blog Service

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a single blog post
- `POST /api/blogs` - Create a new blog post (protected)
- `PUT /api/blogs/:id` - Update a blog post (protected)
- `DELETE /api/blogs/:id` - Delete a blog post (protected)

## Development

### Running Services Individually

1. User Service:

```bash
cd user-service
npm install
npm run dev
```

2. Blog Service:

```bash
cd blog-service
npm install
npm run dev
```

### Environment Variables

Create `.env` files in both service directories with the following variables:

User Service (.env):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_jwt_secret_key_here
```

Blog Service (.env):

```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/blog-platform
```
