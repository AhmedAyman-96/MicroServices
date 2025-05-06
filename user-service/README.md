# User Service

This is the User Service for the Blog Platform, built with TypeScript, Express, and MongoDB.

## Features

- User registration and authentication
- JWT-based authentication
- User profile management
- Protected routes

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_jwt_secret_key_here
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### User Profile

- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

## Development

The service is built with TypeScript and uses:

- Express.js for the web framework
- MongoDB for the database
- JWT for authentication
- Express Validator for input validation
