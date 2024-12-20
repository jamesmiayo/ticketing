import { Dialog, IconButton, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import UserTicketTableRow from "../UserTicket/UserTicketTableRow";
import TableComponents from "../../components/common/TableComponents";
import { useNavigate } from "react-router-dom";
import AHTModal from "./AHTModal";

export default function AHTTicketTable({ data, isLoading }: any) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      field: "ticket_id",
      headerName: "Ticket ID",
      width: 250,
      renderCell: (params: any) => params?.row?.ticket_id,
    },
    {
      field: "ticket_priority",
      headerName: "Priority",
      width: 140,
      renderCell: (params: any) => params?.row?.ticket_priority,
    },
    {
      field: "requestor",
      headerName: "Requestor",
      width: 140,
      renderCell: (params: any) => params?.row?.requestor?.name,
    },
    {
      field: "assignee",
      headerName: "Facilitator",
      width: 140,
      renderCell: (params: any) =>
        params?.row?.ticket_logs_latest?.assignee?.name,
    },
    {
      field: "total_duration",
      headerName: "Total Duration",
      width: 140,
      renderCell: (params: any) => params?.row?.total_duration,
    },
    {
      field: "created_at",
      headerName: "Created On",
      width: 250,
      renderCell: (params: any) => params?.row?.created_at,
    },
    {
      field: "view",
      headerName: "Options",
      width: 170,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title="View">
            <IconButton onClick={() => handleViewClick(params.row)}>
              <FaEye />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  function handleViewClick(data: any) {
    setRowData(data);
    setOpen(true);
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}  maxWidth="lg">
        <AHTModal data={rowData} setOpen={open} />
      </Dialog>
      <TableComponents
        rows={data}
        isLoading={isLoading}
        columns={columns}
        height={700}
      />
    </>
  );
}
