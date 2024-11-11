import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext'; // Adjust import paths as necessary
import { useExecuteToast } from '../../context/ToastContext';


const Sidebar: React.FC = ({ children }) => {
  const { logoutUser } = useAuth();
  const toast = useExecuteToast();
  const navigate = useNavigate(); // Using useNavigate from React Router
  const [activeNavItem, setActiveNavItem] = useState('');

  const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon:'' },
    { title: 'Ticket', path: '/ticket', icon:'' },
  ];

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      toast.executeToast(response?.message, 'top-center', true, {
        type: 'success',
      });
      navigate('/login'); // Redirect to login after logout
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavigation = (path: string, title: string) => {
    setActiveNavItem(title);
    navigate(path); // Navigate to the selected path
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 240, backgroundColor: '#f5f5f5' }}>
        <List>
          {navItems.map((item, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleNavigation(item.path, item.title)}
              className={item.title === activeNavItem ? 'active-item' : ''}
              style={{
                backgroundColor: item.title === activeNavItem ? '#d3d3d3' : 'inherit',
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <div>
        <Button
          onClick={handleLogout}
          color="primary"
          variant="contained"
          sx={{ margin: 2 }}
        >
          Logout
        </Button>
        </div>
      </Box>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
};

export default Sidebar;
