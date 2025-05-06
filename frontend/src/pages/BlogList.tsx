import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    TextField,
    Box,
    Chip,
    CardActionArea,
} from '@mui/material';
import { blogApi } from '../services/api';
import type { Blog } from '../types';
import useAuthStore from '../store/authStore';

const BlogList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const { data: blogs, isLoading } = useQuery<Blog[]>({
        queryKey: ['blogs'],
        queryFn: async () => {
            const response = await blogApi.get('/api/blogs');
            return response.data;
        },
    });

    const filteredBlogs = blogs?.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Blog Posts
                </Typography>
                {isAuthenticated && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/blogs/new')}
                        sx={{ mb: 2 }}
                    >
                        Create New Blog
                    </Button>
                )}
                <TextField
                    fullWidth
                    label="Search blogs"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 2 }}
                />
            </Box>
            <Grid container spacing={3}>
                {filteredBlogs?.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={blog.id}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`/blogs/${blog.id}`)}>
                                <CardContent>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {blog.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {blog.content}
                                    </Typography>
                                    <Box sx={{ mt: 1 }}>
                                        {blog.tags.map((tag) => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                sx={{ mr: 0.5, mb: 0.5 }}
                                            />
                                        ))}
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mt: 1, display: 'block' }}
                                    >
                                        By {blog.author.username} • {new Date(blog.createdAt).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(`/blogs/${blog.id}`)}>
                                    Read More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BlogList; 