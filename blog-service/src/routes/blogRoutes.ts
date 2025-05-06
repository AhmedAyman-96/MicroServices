import { Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import { body, ValidationChain } from "express-validator";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import { auth } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Validation chains
const createBlogValidation: ValidationChain[] = [
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("content").notEmpty().withMessage("Content is required"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
];

const updateBlogValidation: ValidationChain[] = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("content").optional().notEmpty().withMessage("Content cannot be empty"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
];

// Cast handlers to RequestHandler type
const handlers = {
  createBlog: createBlog as RequestHandler,
  getAllBlogs: getAllBlogs as RequestHandler,
  getBlogById: getBlogById as RequestHandler,
  updateBlog: updateBlog as RequestHandler,
  deleteBlog: deleteBlog as RequestHandler,
};

/**
 * @openapi
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  [auth, ...createBlogValidation, validateRequest],
  handlers.createBlog
);

/**
 * @openapi
 * /api/blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags:
 *       - Blogs
 *     responses:
 *       200:
 *         description: List of blogs
 */
router.get("/", handlers.getAllBlogs);

/**
 * @openapi
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a single blog post
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post data
 *       404:
 *         description: Blog post not found
 */
router.get("/:id", handlers.getBlogById);

/**
 * @openapi
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Blog updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 */
router.put(
  "/:id",
  [auth, ...updateBlogValidation, validateRequest],
  handlers.updateBlog
);

/**
 * @openapi
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Blog deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 */
router.delete("/:id", auth, handlers.deleteBlog);

export default router;
