import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Link,
} from '@mui/material';
import { userApi } from '../services/api';
import useAuthStore from '../store/authStore';
import type { RegisterCredentials } from '../types';

const Register = () => {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await userApi.post('/api/users/register', credentials);
            setToken(response.data.token);
            navigate('/blogs');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Paper elevation={3} sx={{ p: 4, width: 400, maxWidth: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Register
                </Typography>
                {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={credentials.username}
                        onChange={(e) =>
                            setCredentials({ ...credentials, username: e.target.value })
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={credentials.email}
                        onChange={(e) =>
                            setCredentials({ ...credentials, email: e.target.value })
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({ ...credentials, password: e.target.value })
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link component="button" variant="body2" onClick={() => navigate('/login')}>
                            Already have an account? Sign In
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register; 