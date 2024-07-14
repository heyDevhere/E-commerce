import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebaseConfig/auth'
import { useAuth } from '../context/auth_Context'
import { TextField, Button, Container, Typography, Box, CircularProgress, Divider } from '@mui/material'
// import { Google as GoogleIcon } from '@mui/icons-material'
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
                window.scrollTo(0, 0);

            } catch (error) {
                setErrorMessage(error.message)
                setIsSigningIn(false)
            }
        }
    }

    const onGoogleSignIn = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithGoogle()
                window.scrollTo(0, 0);
            } catch (error) {
                setErrorMessage(error.message)
                setIsSigningIn(false)
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                    Welcome to Electronic Store
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
                              fontSize: '1.2rem',
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
                        autoComplete="current-password"
                        value={password}
                        sx={{
                            '& .MuiInputBase-input': {
                              fontSize: '1.5rem',
                            },
                            '& .MuiInputLabel-root': {
                              fontSize: '1.2rem',
                            },
                          }}                     
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <Typography color="error">{errorMessage}</Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 ,fontSize: '1.5rem'}}
                        disabled={isSigningIn}
                    >
                        {isSigningIn ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                </Box>
                <Typography variant="h6" component="h6"    sx={{fontSize: '1.5rem'}}
                >
                    Don't have an account? <Link to="/register">Sign up</Link>
                </Typography>
                <Divider sx={{ my: 2 }}>OR</Divider>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={onGoogleSignIn}
                    disabled={isSigningIn}
                    sx={{fontSize: '1.5rem'}}
                >
                    {isSigningIn ? <CircularProgress size={24} /> : 'Continue with Google'}
                </Button>
            </Box>
        </Container>
    )
}

export default Login
