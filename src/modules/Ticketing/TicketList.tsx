import React from 'react'
import TicketCard from './TicketCard'

const tickets = [
  { title: 'Fix login issue', status: 'Open', priority: 'High' },
  {
    title: 'Update user profile page',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    title: 'Review payment gateway integration',
    status: 'Resolved',
    priority: 'Low',
  },
]

const TicketList: React.FC = () => {
  return (
    <div>
      {tickets.map((ticket, index) => (
        <TicketCard
          key={index}
          title={ticket.title}
          status={ticket.status}
          priority={ticket.priority}
        />
      ))}
    </div>
  )
}

export default TicketList
