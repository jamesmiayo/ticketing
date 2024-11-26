import { Dialog, IconButton, Tooltip } from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegUserCircle } from "react-icons/fa";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import TicketAssignee from "./TicketAssignee";
import { FaRegFlag } from "react-icons/fa";
import TicketPriority from "./TicketPriority";

interface Ticket {
  ticketNo: string;
  dateTime: string;
  title: string;
  concern: string;
  category: string;
  department: string;
  section: string;
  tech: string;
  status: string;
}

export default function TicketTable({
  tickets,
  isLoading,
  isOptions = false,
  onPageChange,
  pageProps,
  customInputs,
  onSubmit,
  onReset,
  maxCount,
  refetch,
}: any) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();
  const [modal, setModal] = useState<any>();
  const navigate = useNavigate();

  const handleViewClick = (params: any) => {
    navigate(`/ticket-information?id=${params.ticket_id}`);
  };

  function handleAssigneClick(params: any , value:any) {
    setModal(value)
    setData(params);
    setOpen(true);
  }

  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 140 },
    { field: "assignee", headerName: "Assignee", width: 140 },
    { field: "title", headerName: "Title", width: 270 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "category", headerName: "Category", width: 180 },
    { field: "subCategory", headerName: "Sub Category", width: 180 },
    { field: "updated_by", headerName: "Updated By", width: 180 },
    { field: "created_at", headerName: "Date Time", width: 180 },
    ...(isOptions
      ? [
          {
            field: "view",
            headerName: "Options",
            width: "100%",
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
              <>
                <Tooltip title={"View"}>
                  <IconButton onClick={() => handleViewClick(params.row)}>
                    <FaEye />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Assign Ticket"}>
                  <IconButton onClick={() => handleAssigneClick(params.row , 'assign')}>
                    <FaRegUserCircle />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Change Priority"}>
                  <IconButton onClick={() => handleAssigneClick(params.row , 'priority')}>
                    <FaRegFlag />
                  </IconButton>
                </Tooltip>
              </>
            ),
          },
        ]
      : []),
  ];
  return (
    <>
        <Dialog open={open} onClose={() => setOpen(false)}>
    {modal === 'priority' ? <TicketPriority  data={data}
        setOpen={setOpen}
        refetch={refetch}/> : 
      <TicketAssignee
        data={data}
        setOpen={setOpen}
        refetch={refetch}
      />
      }
    </Dialog>
     
      <TableComponents
        columns={columns}
        rows={tickets}
        onPageChange={onPageChange}
        pageProps={pageProps}
        height={600}
        customInputs={customInputs}
        onSubmit={onSubmit}
        onReset={onReset}
        maxCount={maxCount}
        isLoading={isLoading}
      />
    </>
  );
}
