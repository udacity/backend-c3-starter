import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useUser } from '../context/UserContext'; 


const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useUser(); 


  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        
        const userResponse = await api.get('/users/profile');
        login(userResponse.data.id); 
        localStorage.setItem('user', JSON.stringify(userResponse.data));

        navigate('/tasks');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#ffffff',
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            gutterBottom 
            sx={{ color: '#1976d2', fontWeight: 'bold' }}
          >
            Welcome Back!
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <TextField
              label="Username"
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{ backgroundColor: '#f9f9f9' }}
            />
            <TextField
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{ backgroundColor: '#f9f9f9' }}
            />
            <Grid container spacing={2} justifyContent="space-between" marginTop={2}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 'bold' }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => navigate('/register')}
                  sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
