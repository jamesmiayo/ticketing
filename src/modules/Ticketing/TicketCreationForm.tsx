import React, { useState, useEffect } from 'react';
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

// Sample subcategories for each category
const subcategories = {
  Login: ['Forgot Password', 'Authentication Failure', 'Account Lock'],
  'UI/UX': ['Page Layout', 'Color Scheme', 'Navigation Issues'],
  API: ['Endpoint Issue', 'Integration Failure', 'API Documentation'],
  Payment: ['Payment Failure', 'Refund Issue', 'Invoice Error'],
  Other: ['General Inquiry', 'Feature Request', 'Bug Report'],
};

const statuses = ['Open', 'Resolved'];

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
  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedCategory = e.target.value as string;
    setTicket((prevState) => ({
      ...prevState,
      category: selectedCategory,
      subcategory: '', // Reset subcategory when category changes
    }));

    // Update available subcategories based on selected category
    setAvailableSubcategories(subcategories[selectedCategory] || []);
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
      concern: '',
      category: '',
      subcategory: '',
      status: 'Open',
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
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={ticket.category}
                onChange={handleCategoryChange}
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
              <InputLabel>Subcategory</InputLabel>
              <Select
                name="subcategory"
                value={ticket.subcategory}
                onChange={handleChange}
                label="Subcategory"
                required
                disabled={!ticket.category} // Disable subcategory until category is selected
              >
                {availableSubcategories.length > 0 ? (
                  availableSubcategories.map((subcategory) => (
                    <MenuItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No subcategories available</MenuItem>
                )}
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
