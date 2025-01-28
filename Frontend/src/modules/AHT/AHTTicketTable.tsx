import { Chip, Tooltip } from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { Cancel, CheckCircle } from "@mui/icons-material";

export default function AHTTicketTable({
  data,
  isLoading,
  handleReset, 
  onRowClick
}: any) {
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
      width: 160,
      renderCell: (params: any) => (
        <Chip
          label={params?.row?.aht_passed === 1 ? "Passed" : "Failed"}
          color={params?.row?.aht_passed === 1 ? "success" : "error"}
          size="small"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
          icon={params?.row?.aht_passed === 1 ? <CheckCircle /> : <Cancel />}
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 140,
      renderCell: (params: any) => params?.row?.title,
    },
    {
      field: "ticket_priority",
      headerName: "Priority",
      width: 140,
      renderCell: (params: any) => (
        <Tooltip title={params?.row?.sla?.response_time}>
          <Chip
            label={params?.row?.sla?.priority_label}
            size="small"
            sx={{
              backgroundColor: params?.row?.sla?.priority_color,
              fontWeight: "bold",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      ),
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
      renderCell: (params: any) => params?.row?.aht_total_duration_time,
    },
    {
      field: "created_at",
      headerName: "Created On",
      width: 250,
      renderCell: (params: any) => params?.row?.created_at,
    },
  ];

  return (
    <>

      <TableComponents
        rows={data}
        isLoading={isLoading}
        columns={columns}
        height={700}
        onReset={handleReset}
        onRowClick={onRowClick}
      />
    </>
  );
}
