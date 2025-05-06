import { Request, Response, NextFunction } from "express";
import { Blog } from "../models/Blog";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, tags } = req.body;
    const blog = new Blog({
      title,
      content,
      author: req.user?.userId,
      tags: tags || [],
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(blog);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Check if the user is the author
    if (blog.author.toString() !== req.user?.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, content, tags } = req.body;

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (tags) blog.tags = tags;

    await blog.save();
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Check if the user is the author
    if (blog.author.toString() !== req.user?.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
