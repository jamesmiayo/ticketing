import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import UserCard from '../common/UserCard';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="light">
      <Toolbar>
        <UserCard />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
