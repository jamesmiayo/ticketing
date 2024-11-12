import React, { useEffect, useState } from 'react'
import TicketList from './TicketList' // Import Ticket List component for card view
import TicketCreationForm from './TicketCreationForm' // Import the Ticket Creation Form component
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import TicketTable from './TicketTable';
import { ticketApi } from '../../api/services/ticket';
interface Ticket {
  ticketNo: string
  dateTime: string
  title: string
  concern: string
  category: string
  department: string
  section: string
  tech: string
  status: string // Ensure all tickets have a status field
}

const TicketPage: React.FC = () => {
 
  const [open, setOpen] = useState(false) 

  // Open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await ticketApi.getTicketData()
      if (result) {
        const formattedTickets = result.map((ticket:any) => ({
          id: ticket.id,
          ticket_id: ticket.ticket_id || 'N/A',
          requestedBy: ticket.user?.name || 'N/A', 
          title: ticket.title || 'N/A',
          category: ticket.sub_category?.category?.category_description || 'N/A',
          subCategory: ticket.sub_category?.subcategory_description || 'N/A',
          status: ticket?.ticket_logs_latest?.ticket_status || 'Unknown', 
          created_at: ticket?.ticket_logs_latest?.created_at,
          assignee: ticket?.ticket_logs_latest?.assignee?.name || 'No assignee',  
          updated_by: ticket?.ticket_logs_latest?.updated_by?.name || 'No assignee',  
        }));
        setData(formattedTickets);
      } else {
        console.warn('Unexpected data structure:', result)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } 
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>Ticket Overview</h1>
      <TicketList /> 
      <div className="flex justify-end">
  <Button
    variant="contained"
    color="primary"
    onClick={handleOpen}
    sx={{ mb: 2, ml: 2 }}
  >
    Create Ticket
  </Button>
</div>

      <TicketTable tickets={data} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Ticket</DialogTitle>
        <DialogContent>
          <TicketCreationForm onCreate={() => setOpen(false)} refetch={fetchData} />{' '}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TicketPage
