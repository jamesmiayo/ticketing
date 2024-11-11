// TicketList.tsx
import React from 'react'
import { Box } from '@mui/material'
import TicketCard from './TicketCard'

const data = [
  {
    status: 200,
    total_ticket: 3,
    total_ticket_count: [
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
    ],
    total_ticket_branch: {
      total_count_with_branch: [
        {
          branch_name: 'create category 1',
          total_tickets: 3,
        },
      ],
    },
  },
]

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
      {data.map((ticket, ticketIndex) =>
        ticket.total_ticket_count.map((status, statusIndex) => (
          <TicketCard
            key={`${ticketIndex}-${statusIndex}`}
            title={status.title}
            count={status.count}
          />
        ))
      )}
    </Box>
  )
}

export default TicketList
