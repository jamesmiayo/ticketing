import { Box, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'


export default function TicketSideBar() {
    const items = [
        { href: '#simple-list', label: 'Tickets' },
        { href: '#simple-list', label: 'Costs' },
        { href: '#simple-list', label: 'Historical' },
        { href: '#simple-list', label: 'All' }
      ];
  return (
    <Box sx={{ backgroundColor: 'white' }}>
    {items.map((item, index) => (
      <ListItemButton key={index} component="a" href={item.href}>
        <ListItemText primary={item.label} />
      </ListItemButton>
    ))}
  </Box>
  )
}
