# Blog Service

This is the Blog Service for the Blog Platform, built with TypeScript, Express, and MongoDB.

## Features

- Create, read, update, and delete blog posts
- Tag-based organization
- Author association
- Protected routes for authenticated users

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/blog-platform
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

### Blog Posts

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a single blog post
- `POST /api/blogs` - Create a new blog post (protected)
- `PUT /api/blogs/:id` - Update a blog post (protected)
- `DELETE /api/blogs/:id` - Delete a blog post (protected)

## Development

The service is built with TypeScript and uses:

- Express.js for the web framework
- MongoDB for the database
- JWT for authentication
- Express Validator for input validation
