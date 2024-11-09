import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
} from '@mui/material';

const tickets = [
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
];

const TicketTable: React.FC = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: '100%', margin: '20px auto' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography variant="h6">Ticket No</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Datetime</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Title</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Concern</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Category</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Assigned Department</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Assigned Section</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Assigned Tech</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell align="left">{ticket.ticketNo}</TableCell>
              <TableCell align="left">{ticket.dateTime}</TableCell>
              <TableCell align="left">{ticket.title}</TableCell>
              <TableCell align="left">{ticket.concern}</TableCell>
              <TableCell align="left">{ticket.category}</TableCell>
              <TableCell align="left">{ticket.department}</TableCell>
              <TableCell align="left">{ticket.section}</TableCell>
              <TableCell align="left">{ticket.tech}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketTable;
