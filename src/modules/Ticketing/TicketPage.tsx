import React, { useState } from 'react';
import TicketList from './TicketList'; // Import the TicketList component
import TicketCreationForm from './TicketCreationForm'; // Import the TicketCreationForm component
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import TicketTable from './TicletTable';

const TicketPage: React.FC = () => {
  const [tickets, setTickets] = useState([
    {
      ticketNo: 'T001',
      dateTime: '2024-11-09 10:00 AM',
      title: 'Fix login issue',
      concern: 'Authentication Failure',
      category: 'Login',
      department: 'IT Support',
      section: 'Backend',
      tech: 'John Doe',
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
    },
  ]);

  const [open, setOpen] = useState(false); // Modal open state

  // Handle new ticket creation
  const handleCreateTicket = (newTicket: any) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]); // Add the new ticket to the tickets list
    setOpen(false); // Close the modal after creating the ticket
  };

  // Open and close the modal
  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => setOpen(false); // Close the modal

  return (
    <div>
      <h1>Ticket Overview</h1>
      {/* Button to open the Create Ticket modal */}
      <TicketList /> {/* Render Ticket Cards */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: 2 }}
      >
        Create Ticket
      </Button>
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
