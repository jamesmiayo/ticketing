import React from 'react'

import Box from '@mui/material/Box'
import Sidebar from '../../components/navigation/SideBar'
import Header from '../../components/layouts/Header'
import TicketList from '../Ticketing/TicketList'

const Dashboard: React.FC = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Box p={3}>
          <h2>Tickets Overview</h2>
          <TicketList />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
