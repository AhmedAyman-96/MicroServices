import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Container,
    Paper,
    Typography,
    Box,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { blogApi } from '../services/api';
import useAuthStore from '../store/authStore';
import type { Blog } from '../types';

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { data: blog, isLoading } = useQuery<Blog>({
        queryKey: ['blog', id],
        queryFn: async () => {
            const response = await blogApi.get(`/api/blogs/${id}`);
            return response.data;
        },
    });

    const deleteBlogMutation = useMutation({
        mutationFn: async () => {
            await blogApi.delete(`/api/blogs/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            navigate('/blogs');
        },
    });

    if (isLoading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    if (!blog) {
        return (
            <Container>
                <Typography>Blog post not found</Typography>
            </Container>
        );
    }

    const isAuthor = user?.id === blog.author.id;

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {blog.title}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">
                        By {blog.author.username} • {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    {blog.tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                        />
                    ))}
                </Box>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 4 }}>
                    {blog.content}
                </Typography>
                {isAuthor && (
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/blogs/${id}/edit`)}
                            sx={{ mr: 1 }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            Delete
                        </Button>
                    </Box>
                )}
            </Paper>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Blog Post</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this blog post? This action cannot be
                        undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            deleteBlogMutation.mutate();
                            setDeleteDialogOpen(false);
                        }}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BlogDetail; 