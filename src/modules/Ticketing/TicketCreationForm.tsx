import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Typography,
} from '@mui/material';

// Sample categories and statuses (you can customize these)
const categories = ['Login', 'UI/UX', 'API', 'Payment', 'Other'];
const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

interface TicketCreationFormProps {
  onCreate: (ticket: any) => void; // Callback to pass the new ticket back to parent
}

const TicketCreationForm: React.FC<TicketCreationFormProps> = ({
  onCreate,
}) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    category: '',
    status: 'Open',
    tech: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setTicket((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = {
      ...ticket,
      ticketNo: `T${Date.now()}`,
      dateTime: new Date().toLocaleString(),
    };
    onCreate(newTicket); // Pass the new ticket to parent
    setTicket({
      title: '',
      description: '',
      category: '',
      status: 'Open',
      tech: '',
    }); // Reset form after submission
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Ticket
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Ticket Title"
              name="title"
              fullWidth
              value={ticket.title}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              value={ticket.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={ticket.category}
                onChange={handleChange}
                label="Category"
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={ticket.status}
                onChange={handleChange}
                label="Status"
                required
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Assigned Technician"
              name="tech"
              fullWidth
              value={ticket.tech}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Ticket
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TicketCreationForm;
