import React from 'react';

import Box from '@mui/material/Box';
import Sidebar from '../../components/navigation/SideBar';
import Header from '../../components/layouts/Header';
import TicketPage from '../Ticketing/TicketPage';

const Dashboard: React.FC = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Box p={3}>
          <TicketPage />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
