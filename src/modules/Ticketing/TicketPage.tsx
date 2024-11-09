import React, { useState } from 'react';
import TicketList from './TicketList'; // Import Ticket List component for card view
import TicketCreationForm from './TicketCreationForm'; // Import the Ticket Creation Form component
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import TicketTable from './TicletTable';
// Import TicketTable component

interface Ticket {
  ticketNo: string;
  dateTime: string;
  title: string;
  concern: string;
  category: string;
  department: string;
  section: string;
  tech: string;
  status: string; // Ensure all tickets have a status field
}

const TicketPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      ticketNo: 'T001',
      dateTime: '2024-11-09 10:00 AM',
      title: 'Fix login issue',
      concern: 'Authentication Failure',
      category: 'Login',
      department: 'IT Support',
      section: 'Backend',
      tech: 'John Doe',
      status: 'Open', // Example status
    },
    {
      ticketNo: 'T002',
      dateTime: '2024-11-09 11:30 AM',
      title: 'Update user profile page',
      concern: 'UI Issue',
      category: 'UI/UX',
      department: 'Frontend',
      section: 'Design',
      tech: 'Jane Smith',
      status: 'In Progress', // Example status
    },
    {
      ticketNo: 'T003',
      dateTime: '2024-11-09 02:15 PM',
      title: 'Review payment gateway integration',
      concern: 'Payment Failure',
      category: 'Payment',
      department: 'Finance',
      section: 'API Integration',
      tech: 'Tom Lee',
      status: 'Resolved', // Example status
    },
  ]);

  const [open, setOpen] = useState(false); // Modal open state

  // Handle new ticket creation
  const handleCreateTicket = (newTicket: Ticket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]); // Add the new ticket to the tickets list
    setOpen(false); // Close the modal after creating the ticket
  };

  // Open and close the modal
  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => setOpen(false); // Close the modal

  return (
    <div>
      <h1>Ticket Overview</h1>
      {/* Render the Ticket List (Card View) */}
      <TicketList /> {/* Pass tickets to display in card format */}
      {/* Button to open the Create Ticket modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: 2 }}
      >
        Create Ticket
      </Button>
      {/* Render the Ticket Table */}
      <TicketTable tickets={tickets} />{' '}
      {/* Render the ticket table with updated tickets */}
      {/* Modal for Ticket Creation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Ticket</DialogTitle>
        <DialogContent>
          <TicketCreationForm onCreate={handleCreateTicket} />{' '}
          {/* Pass the ticket creation handler */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TicketPage;
