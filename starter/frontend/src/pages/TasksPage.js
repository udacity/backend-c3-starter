import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Card,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import dayjs from 'dayjs'; 
import { useUser } from '../context/UserContext';
import api from '../services/api';
import TaskCard from '../components/TaskCard';

const TasksPage = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: null, 
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await api.get(`/users/${user?.user_id}/tasks`);
        setTasks(tasksResponse.data);

      } catch (error) {
        console.error('Error fetching tasks or departments', error);
      }
    };
    fetchData();
  }, [user]);

  
  const handleCreateTask = async () => {
    if (!user) {  
      alert('Please log in to create tasks');
      return;
    }
  
    if (!newTask.title || !newTask.description || !newTask.due_date) {
      alert('Please fill out all fields including due date.');
      return;
    }
  
    try {
      const response = await api.post('/tasks', {
        ...newTask,
        user_id: user?.user_id,  
        due_date: dayjs(newTask.due_date).toISOString(),
      });
            
            setTasks(prev => [...prev, response.data]);
            setNewTask({ title: '', description: '', due_date: null });
      window.location.reload();
    } catch (error) {
      console.error('Error creating task', error);
    }
  };


  
  const handleRegisterDepartment = async (departmentId) => {
    try {
      await api.post(`/users/${user.id}/departments/`, { departmentId });
      alert('Registered to department');
    } catch (error) {
      console.error('Error registering to department', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container sx={{ marginTop: 4 }}>
        {/* Page Header */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}
        >
          Taskify
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, marginBottom: 4 }}>
          {/* Task Creation Section */}
          <Card sx={{ flex: 1, padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Create a Task
            </Typography>
            <TextField
              label="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            {/* Date Picker for Due Date */}
            <DatePicker
              label="Due Date"
              value={newTask.due_date}
              onChange={(date) => setNewTask({ ...newTask, due_date: date })}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
            <Button
              onClick={handleCreateTask}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Create Task
            </Button>
          </Card>


        </Box>

        {/* Tasks List Section */}
        <Typography variant="h5" gutterBottom>
          Your Tasks
        </Typography>
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default TasksPage;
