import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Chip,
    Stack,
} from '@mui/material';
import { blogApi } from '../services/api';
import type { BlogFormData } from '../types';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        content: '',
        tags: [],
    });
    const [tagInput, setTagInput] = useState('');
    const [error, setError] = useState('');

    const createBlogMutation = useMutation({
        mutationFn: async (data: BlogFormData) => {
            const response = await blogApi.post('/api/blogs', data);
            return response.data;
        },
        onSuccess: () => {
            navigate('/blogs');
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Failed to create blog');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createBlogMutation.mutate(formData);
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()],
            });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove),
        });
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create New Blog Post
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={6}
                        label="Content"
                        value={formData.content}
                        onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                        }
                    />
                    <Box sx={{ mt: 2, mb: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <TextField
                                label="Add Tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                            />
                            <Button variant="outlined" onClick={handleAddTag}>
                                Add Tag
                            </Button>
                        </Stack>
                    </Box>
                    <Box sx={{ mt: 1, mb: 2 }}>
                        {formData.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                onDelete={() => handleRemoveTag(tag)}
                                sx={{ mr: 0.5, mb: 0.5 }}
                            />
                        ))}
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={createBlogMutation.isPending}
                    >
                        {createBlogMutation.isPending ? 'Creating...' : 'Create Blog Post'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreateBlog; 