import React from 'react'
import Box from '@mui/material/Box'
import TicketPage from '../Ticketing/TicketPage'
import UserPage from './UserPage'

interface DashboardProps {
  onLogout: () => void // Accept the onLogout prop
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <Box display="flex">
      <Box flex={1}>
        {/* <UserPage /> */}
        <Box p={3}>
          <TicketPage />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
