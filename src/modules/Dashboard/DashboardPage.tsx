import React from 'react';

import Box from '@mui/material/Box';
import Sidebar from '../../components/navigation/SideBar';
import TicketPage from '../Ticketing/TicketPage';
import UserPage from './UserPage';

const Dashboard: React.FC = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>
        <UserPage />
        <Box p={3}>
          <TicketPage />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
