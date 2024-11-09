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

interface Ticket {
  ticketNo: string;
  dateTime: string;
  title: string;
  concern: string;
  category: string;
  department: string;
  section: string;
  tech: string;
}

const TicketTable: React.FC<{ tickets: Ticket[] }> = ({ tickets }) => {
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
