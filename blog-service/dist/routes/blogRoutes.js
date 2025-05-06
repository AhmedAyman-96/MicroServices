"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const blogController_1 = require("../controllers/blogController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Create a new blog post
// @ts-ignore - Type compatibility issue with Express request handlers
router.post("/", [
    auth_1.auth,
    (0, express_validator_1.body)("title").trim().isLength({ min: 3 }),
    (0, express_validator_1.body)("content").notEmpty(),
    (0, express_validator_1.body)("tags").optional().isArray(),
    validation_1.validateRequest,
], async (req, res, next) => {
    try {
        await (0, blogController_1.createBlog)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get all blog posts
// @ts-ignore - Type compatibility issue with Express request handlers
router.get("/", async (req, res, next) => {
    try {
        await (0, blogController_1.getAllBlogs)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get a single blog post
// @ts-ignore - Type compatibility issue with Express request handlers
router.get("/:id", async (req, res, next) => {
    try {
        await (0, blogController_1.getBlogById)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Update a blog post
// @ts-ignore - Type compatibility issue with Express request handlers
router.put("/:id", [
    auth_1.auth,
    (0, express_validator_1.body)("title").optional().trim().isLength({ min: 3 }),
    (0, express_validator_1.body)("content").optional().notEmpty(),
    (0, express_validator_1.body)("tags").optional().isArray(),
    validation_1.validateRequest,
], async (req, res, next) => {
    try {
        await (0, blogController_1.updateBlog)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Delete a blog post
// @ts-ignore - Type compatibility issue with Express request handlers
router.delete("/:id", auth_1.auth, async (req, res, next) => {
    try {
        await (0, blogController_1.deleteBlog)(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
