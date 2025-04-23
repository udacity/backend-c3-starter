import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import api from '../services/api';
import { Button, Typography, Box, Container, Card, CardContent } from '@mui/material';

const ProfilePage = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfileData(res.data); 
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, [user]);

  if (error)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );

  if (!profileData)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );

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
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            {/* Profile Header */}
            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}
            >
              Profile Information
            </Typography>

            {/* Profile Details */}
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>ID:</strong> {profileData.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Username:</strong> {profileData.username}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {profileData.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Joined At:</strong>{" "}
                {new Date(profileData.CreatedAt).toLocaleDateString()}
              </Typography>
            </Box>

            {/* Manager Access Button */}
            <Box sx={{ textAlign: 'center', marginTop: 3 }}>
              <Button
                onClick={() => alert('Request sent to become a manager')}
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                Request Manager Access
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ProfilePage;
