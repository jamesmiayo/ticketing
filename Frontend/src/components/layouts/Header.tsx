import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'light' }}>
      <Toolbar>
        {/* <UserCard /> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
