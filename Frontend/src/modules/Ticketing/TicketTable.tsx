import {
  Dialog,
  //  Dialog,
  IconButton,
  Tooltip,
} from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import TicketStatus from "./TicketStatus";

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
}: // refetch,
any) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

  const handleViewClick = (params: any) => {
    navigate(`/ticket-information?id=${params.ticket_id}`);
  };

  function handleAssigneClick(params: any) {
    setData(params);
    setOpen(true);
  }

  function handlePriorityColor(priority: string): React.CSSProperties {
    switch (priority) {
      case "Critical":
        return { backgroundColor: "#C62E2E" };
      case "High":
        return { backgroundColor: "#E53935" };
      case "Medium":
        return { backgroundColor: "#FF9800" };
      case "Low":
        return { backgroundColor: "#66BB6A" };
      default:
        return { backgroundColor: "#608BC1" };
    }
  }

  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 120 },
    { field: "branch", headerName: "Branch", width: 150 ,
      renderCell: (params: any) =>
        params.row?.requestor?.branch?.branch_description ||
        "No Branch",
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
      renderCell: (params: GridRenderCellParams) => (
        <div
          style={{
            ...handlePriorityColor(params.value),
            borderRadius: "4px",
            padding: "4px 8px",
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "white",
          }}
        >
          {params.value || "N/A"}
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
    { field: "created_at", headerName: "Date Time", width: 180 },
    ...(isOptions
      ? [
          {
            field: "view",
            headerName: "Options",
            width: 180,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
              <>
                <Tooltip title={"View"}>
                  <IconButton onClick={() => handleViewClick(params.row)}>
                    <FaEye />
                  </IconButton>
                </Tooltip>
                {params.row.ticket_logs_latest?.status == "7" &&
                  params.row.b_status != "7" && (
                    <Tooltip title="Done This Ticket">
                      <IconButton
                        onClick={() => handleAssigneClick(params.row)}
                      >
                        <FaCheckCircle />
                      </IconButton>
                    </Tooltip>
                  )}
              </>
            ),
          },
        ]
      : []),
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
      />
    </>
  );
}
