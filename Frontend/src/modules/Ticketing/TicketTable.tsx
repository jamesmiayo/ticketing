import TableComponents from '../../components/common/TableComponents';
import Skeleton from "@mui/material/Skeleton"; // Assuming you are using Material-UI for skeleton loading

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

export default function TicketTable({tickets}:any) {  
  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 140 },
    { field: "requestedBy", headerName: "Requested By", width: 180 },
    { field: "assignee", headerName: "Assignee", width: 140 },
    { field: "title", headerName: "Title", width: 220 },
    { field: "category", headerName: "Category", width: 180 },
    { field: "subCategory", headerName: "Sub Category", width: 180 },
    { field: "status", headerName: "Status", width: 110 },
    { field: "updated_by", headerName: "Updated By", width: 180 },
    { field: "created_at", headerName: "Date Time", width: 180 },
  ];
  return (
        <TableComponents columns={columns} rows={tickets} />
  );
}
