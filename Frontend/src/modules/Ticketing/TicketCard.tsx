// TicketCard.tsx
import React from 'react'
import { Card, Typography, Box } from '@mui/material'

interface TicketCardProps {
  title: string
  count: any
}

const TicketCard: React.FC<TicketCardProps> = ({ title, count }) => {
  return (
    <Card
      sx={{
        width: 150,
        height: 150,
        borderRadius: '50%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 3,
        transition: 'transform 0.3s ease',
        ':hover': {
          transform: 'scale(1.1)', 
        },
      }}
    >
      <Box textAlign="center">
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{count}</Typography>
      </Box>
    </Card>
  )
}

export default TicketCard
