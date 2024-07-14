import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/auth_Context';
import { doCreateUserWithEmailAndPassword } from '../firebaseConfig/auth';
import { TextField, Button, Container, Typography, Box, CircularProgress, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            {userLoggedIn && <Navigate to={'/'} replace={true} />}

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                    Create a New Account
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        sx={{
                            '& .MuiInputBase-input': {
                              fontSize: '1.5rem',
                            },
                            '& .MuiInputLabel-root': {
                              fontSize: '1.1rem',
                            },
                          }} 
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        sx={{
                            '& .MuiInputBase-input': {
                              fontSize: '1.5rem',
                            },
                            '& .MuiInputLabel-root': {
                              fontSize: '1.1rem',
                            },
                          }} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="off"
                        value={confirmPassword}
                        sx={{
                            '& .MuiInputBase-input': {
                              fontSize: '1.5rem',
                            },
                            '& .MuiInputLabel-root': {
                              fontSize: '1.1rem',
                            },
                          }} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <Typography color="error">{errorMessage}</Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 ,fontSize: '1.5rem'}}
                        disabled={isRegistering}
                    >
                        {isRegistering ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                </Box>
                <Typography variant="h6" component="h6" sx={{fontSize: '1.5rem'}}>
                    Already have an account? <Link to="/login" sx={{fontSize: '1.2rem'}} >Sign in</Link>
                </Typography>
                <Divider sx={{ my: 2 }}>OR</Divider>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    disabled={isRegistering}
                    sx={{fontSize: '1.2rem'}}
                >
                    {isRegistering ? <CircularProgress size={24} /> : 'Continue with Google'}
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
