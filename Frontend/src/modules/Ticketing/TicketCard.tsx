// TicketCard.tsx
import React from 'react';
import { Card, Typography, Box } from '@mui/material';

interface TicketCardProps {
  title: string;
  count: any;
  color: string; // Add color prop
}

const TicketCard: React.FC<TicketCardProps> = ({ title, count, color }) => {
  return (
    <Card
      sx={{
        width: 150,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color, 
        color: '#fff'
      }}
    >
      <Box textAlign="center">
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{count}</Typography>
      </Box>
    </Card>
  );
};

export default TicketCard;
