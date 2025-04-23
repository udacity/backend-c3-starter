import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const TaskCard = ({ task }) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        marginBottom: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#f9f9f9',
      }}
    >
      <CardContent>
        {/* Task Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1 }}
        >
          {task.title}
        </Typography>

        {/* Task Description */}
        <Typography variant="body2" color="textSecondary" paragraph>
          {task.description || 'No description provided.'}
        </Typography>

        {/* Task Metadata */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Due Date: {new Date(task.due_date).toLocaleDateString()}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green',
              fontWeight: 'bold',
            }}
          >
            Priority: {task.priority || 'Low'}
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
        >
          View Task
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
