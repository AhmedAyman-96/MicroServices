"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const Blog_1 = require("../models/Blog");
const createBlog = async (req, res) => {
    var _a;
    try {
        const { title, content, tags } = req.body;
        const blog = new Blog_1.Blog({
            title,
            content,
            author: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            tags: tags || [],
        });
        await blog.save();
        res.status(201).json(blog);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createBlog = createBlog;
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog_1.Blog.find()
            .populate("author", "username")
            .sort({ createdAt: -1 });
        res.json(blogs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAllBlogs = getAllBlogs;
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog_1.Blog.findById(req.params.id).populate("author", "username");
        if (!blog) {
            res.status(404).json({ message: "Blog post not found" });
            return;
        }
        res.json(blog);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getBlogById = getBlogById;
const updateBlog = async (req, res) => {
    var _a;
    try {
        const blog = await Blog_1.Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: "Blog post not found" });
            return;
        }
        // Check if the user is the author
        if (blog.author.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        const { title, content, tags } = req.body;
        if (title)
            blog.title = title;
        if (content)
            blog.content = content;
        if (tags)
            blog.tags = tags;
        await blog.save();
        res.json(blog);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    var _a;
    try {
        const blog = await Blog_1.Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: "Blog post not found" });
            return;
        }
        // Check if the user is the author
        if (blog.author.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        await blog.deleteOne();
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteBlog = deleteBlog;
