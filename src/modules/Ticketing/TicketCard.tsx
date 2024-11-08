import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface TicketCardProps {
  title: string
  status: string
  priority: string
}

const TicketCard: React.FC<TicketCardProps> = ({ title, status, priority }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Status: {status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Priority: {priority}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TicketCard
