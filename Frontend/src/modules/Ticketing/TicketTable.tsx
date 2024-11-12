import { useEffect , useState} from 'react'
import { ticketApi } from '../../api/services/ticket';
import TableComponents from '../../components/common/TableComponents';

export default function TicketTable() {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ticketApi.getTicketData()
        if (result) {
          console.log(result)
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
          setTickets(formattedTickets);
        } else {
          console.warn('Unexpected data structure:', result)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } 
    }
    fetchData()
  }, [])
  const columns = [
    { field: 'ticket_id', headerName: 'Ticket ID', width: 140 },
    { field: 'requestedBy', headerName: 'Requested By', width: 180 },
    { field: 'assignee', headerName: 'Assignee', width: 140 },
    { field: 'title', headerName: 'Title', width: 220 },
    { field: 'category', headerName: 'Category', width: 180 },
    { field: 'subCategory', headerName: 'Sub Category', width: 180 },
    { field: 'status', headerName: 'Status', width: 110 },
    { field: 'updated_by', headerName: 'Updated By', width: 180 },
    { field: 'created_at', headerName: 'Date Time', width: 180 },
  ];
  return (
    <div>
      <TableComponents columns={columns} rows={tickets}/>
    </div>
  )
}
