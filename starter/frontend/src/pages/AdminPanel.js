import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography, Box, Card, CardContent } from '@mui/material';
import api from '../services/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersResponse = await api.get('/users');
        setUsers(usersResponse.data);

        const tasksResponse = await api.get('/tasks');
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching admin data', error);
      }
    };
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Page Header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}
      >
        Admin Panel
      </Typography>

      {/* Users Section */}
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Users
          </Typography>
          <Grid container spacing={3}>
            {users.length > 0 ? (
              users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: '#f9f9f9',
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {user.username}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteUser(user.id)}
                      sx={{ marginTop: 1 }}
                    >
                      Delete User
                    </Button>
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography>No users found.</Typography>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Tasks
          </Typography>
          <Grid container spacing={3}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: '#f9f9f9',
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {task.title}
                    </Typography>
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography>No tasks found.</Typography>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminPanel;
