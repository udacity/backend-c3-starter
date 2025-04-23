import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Box, Typography, CircularProgress } from '@mui/material';

const LogoutPage = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();
  
    useEffect(() => {
      localStorage.removeItem('access_token');
      setUser(null); 
      navigate('/');
    }, [setUser, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
      }}
    >
      <CircularProgress sx={{ marginBottom: 2 }} />
      <Typography variant="h6" color="textSecondary">
        Logging out...
      </Typography>
    </Box>
  );
};

export default LogoutPage;
