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
} from '@mui/material';
import CategorySelector from '../../listing/CategoryList';
import { ticketApi } from '../../api/services/ticket';

const statusOptions = [
  { value: '0', label: 'Open' },
  { value: '6', label: 'Resolved' },
];

interface TicketCreationFormProps {
  onCreate: (ticket: any) => void; // Callback to pass the new ticket back to parent
}

const TicketCreationForm: React.FC<TicketCreationFormProps> = ({
  onCreate,
}) => {
  const [ticket, setTicket] = useState({
    title: '',
    concern: '',
    category: '',
    subcategory: '',
    status: 'Open',
  });

  const [availableSubcategories, setAvailableSubcategories] = useState<
    string[]
  >([]);

  // Update subcategories based on selected category
  const handleCategoryChange = (category: string) => {
    setTicket((prevState) => ({
      ...prevState,
      category,
      subcategory: '', // Reset subcategory when category changes
    }));

    // Update available subcategories based on selected category
    setAvailableSubcategories(subcategories[category] || []);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setTicket((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare the ticket data for API request
      const newTicket = {
        ...ticket,
        status: ticket.status.value,
        ticketid: `T${Date.now()}`, // Generate a unique ticket ID
        dateTime: new Date().toLocaleString(), // Aphpdd dateTime for logging
      };
      // Call the API to create the ticket
      console.log(newTicket);
      await ticketApi.createTicket(newTicket);

      // Optionally, call the onCreate function to notify the parent component
      onCreate(newTicket);

      // Reset the form after successful ticket creation
      setTicket({
        title: '',
        concern: '',
        category: '',
        subcategory: 'asdsa',
        status: 'Open',
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Optionally, show a message to the user indicating an error
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
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
              label="Concern"
              name="concern"
              fullWidth
              value={ticket.concern}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Category Selector */}
            <CategorySelector onCategorySelect={handleCategoryChange} />
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
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
