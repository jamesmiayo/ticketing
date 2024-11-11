import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { useAuth } from "../../context/AuthContext";
import { useExecuteToast } from '../../context/ToastContext';

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { logoutUser } = useAuth();
  const toast = useExecuteToast();

  const logout = async () => {
    try{
      const response = await logoutUser();
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
    }catch(e){
      console.log(e)
    }
  }
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 240, backgroundColor: '#f5f5f5' }}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/user">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <Divider />
        <Button
          onClick={logout}
          color="primary"
          variant="contained"
          sx={{ margin: 2 }}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {children} 
      </Box>
    </Box>
  );
};

export default Sidebar;
