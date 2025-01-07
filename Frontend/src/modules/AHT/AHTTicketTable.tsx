import { Chip, Dialog, IconButton, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import TableComponents from "../../components/common/TableComponents";
import AHTModal from "./AHTModal";
import { Cancel, CheckCircle } from "@mui/icons-material";

export default function AHTTicketTable({
  ticketSearchFilter,
  data,
  isLoading,
  onSubmit,
  handleSubmit,
  handleReset,
}: any) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState([]);

  const columns = [
    {
      field: "ticket_id",
      headerName: "Ticket ID",
      width: 150,
      renderCell: (params: any) => params?.row?.ticket_id,
    },
    {
      field: "aht_passed",
      headerName: "SLA Resolution Time",
      width: 180,
      renderCell: (params: any) => 
        <Chip
        label={params?.row?.aht_passed === 1 ? 'Passed' : 'Failed'}
        color={params?.row?.aht_passed === 1 ? 'success' : 'error'}
        size="small"
        sx={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
        icon={params?.row?.aht_passed === 1 ? <CheckCircle /> : <Cancel />}
      />
      ,
    },
    {
      field: "ticket_priority",
      headerName: "Priority",
      width: 140,
      renderCell: (params: any) => 
        <Tooltip title={params?.row?.sla?.response_time}>
        <Chip
      label={params?.row?.sla?.priority_label}
      size="small"
      sx={{
        backgroundColor: params?.row?.sla?.priority_color,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        cursor: "pointer"
      }}
    />
        </Tooltip>
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
      field: "idle_time",
      headerName: "Total Idle Time",
      width: 140,
      renderCell: (params: any) => params?.row?.aht_idle_time,
    },
    {
      field: "lead_time",
      headerName: "Lead Time",
      width: 140,
      renderCell: (params: any) => params?.row?.aht_lead_time,
    },
    {
      field: "total_duration",
      headerName: "Total Duration",
      width: 140,
      renderCell: (params: any) => params?.row?.aht_total_duration_time,
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
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <AHTModal data={rowData} setOpen={open} />
      </Dialog>
      <TableComponents
        rows={data}
        isLoading={isLoading}
        columns={columns}
        height={700}
        customInputs={ticketSearchFilter}
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
      />
    </>
  );
}
