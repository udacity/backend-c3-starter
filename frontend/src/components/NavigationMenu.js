import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const NavigationMenu = () => {
  const { user } = useUser(); 
  const navigate = useNavigate();

  const getMenuItems = () => {
    const commonItems = [
      { label: 'Profile', path: '/profile' },
      { label: 'Tasks', path: '/tasks' },
      { label: 'Logout', path: '/logout' },
    ];

    if(user) {
        if (user.role === 'manager') {
            return [...commonItems, { label: 'Users', path: '/users' }];
        }

        if (user.role === 'admin') {
            return [...commonItems, { label: 'Users', path: '/users' }];
        }
    }

    
    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manage
        </Typography>
        <Box>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{ marginLeft: 2 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationMenu;
