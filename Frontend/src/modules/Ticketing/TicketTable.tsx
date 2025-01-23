import {
  Dialog,
} from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TicketStatus from "./TicketStatus";

export default function TicketTable({
  tickets,
  isLoading,
  onPageChange,
  pageProps,
  customInputs,
  onSubmit,
  onReset,
  maxCount,
}: // refetch,
any) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

  const handleViewClick = (params: any) => {
    if (params?.row?.ticket_logs_latest?.status === 7) {
      setData(params);
      setOpen(true);
    } else {
      navigate(`/ticket-information?id=${params?.row?.ticket_id}`);
    }
  };

  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 120 },
    {
      field: "branch",
      headerName: "Branch",
      width: 150,
      renderCell: (params: any) =>
        params.row?.requestor?.branch?.branch_description || "No Branch",
    },
    {
      field: "division",
      headerName: "Division",
      width: 110,
      renderCell: (params: any) =>
        params.row.sub_category?.category?.division?.division_description ||
        "No Division",
    },
    {
      field: "Assignee",
      headerName: "Assignee To",
      width: 110,
      renderCell: (params: any) =>
        params.row.ticket_logs_latest?.assignee?.name || "No Assignee",
    },
    {
      field: "requestor",
      headerName: "Request By",
      width: 110,
      renderCell: (params: any) => params.row.requestor.name,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params: any) => (
        <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {params.row.ticket_logs_latest?.ticket_status}
        </span>
      ),
    },
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "ticket_priority",
      headerName: "Priority",
      width: 180,
      renderCell: (params: any) => (
        <div
          style={{
            backgroundColor:
              params.row.sla?.priority_color || "rgb(96, 139, 193)",
            borderRadius: "4px",
            padding: "4px 8px",
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "white",
          }}
        >
          {params.row.sla?.priority_label || "N/A"}
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 180,
      renderCell: (params: any) =>
        params.row.sub_category?.category?.category_description ||
        "No Assignee",
    },
    { field: "created_at", headerName: "Created On", width: 180 },
  ];
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <TicketStatus data={data} setOpen={setOpen} />
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
        onRowClick={handleViewClick}
      />
    </>
  );
}
