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
          const formattedTickets = result.map((ticket:any) => ({
            id: ticket.id,
            requestedBy: ticket.user?.name || 'N/A', // Fallback to 'N/A' if no user name is available
            assignee: ticket.emp_id, // Assuming `emp_id` maps to assignee
            category: ticket.sub_category?.category?.category_description || 'N/A',
            subCategory: ticket.sub_category?.subcategory_description || 'N/A',
            status: ticket.ticket_status || 'Unknown', // Display ticket status
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
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'requestedBy', headerName: 'Requested By', width: 180 },
    { field: 'assignee', headerName: 'Assignee', width: 180 },
    { field: 'category', headerName: 'Category', width: 180 },
    { field: 'subCategory', headerName: 'Sub Category', width: 180 },
    { field: 'status', headerName: 'Status', width: 110 },
  ];
  return (
    <div>
      <TableComponents columns={columns} rows={tickets}/>
    </div>
  )
}
