// TicketList.tsx
import React from 'react';
import { Box } from '@mui/material';
import TicketCard from './TicketCard';

const tickets = [
  { title: 'Total Tickets', count: '23' },
  {
    title: 'Open',
    count: '5',
  },
  {
    title: 'In progress',
    count: '5',
  },
  {
    title: 'On Hold',
    count: '2',
  },
  {
    title: 'Pending',
    count: '2',
  },
  {
    title: 'Cancelled',
    count: '2',
  },
  {
    title: 'Completed',
    count: '2',
  },
  {
    title: 'Closed',
    count: '2',
  },
];

const TicketList: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2, // Space between cards
        flexWrap: 'wrap',
        p: 3,
      }}
    >
      {tickets.map((ticket, index) => (
        <TicketCard key={index} title={ticket.title} count={ticket.count} />
      ))}
    </Box>
  );
};

export default TicketList;
