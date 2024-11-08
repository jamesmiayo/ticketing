import React from 'react'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: 240, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/tickets">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Tickets" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  )
}

export default Sidebar
