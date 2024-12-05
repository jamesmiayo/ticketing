import {
  //  Dialog,
  IconButton,
  Tooltip,
} from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  //  FaRegUserCircle
} from "react-icons/fa";
import { GridRenderCellParams } from "@mui/x-data-grid";
// import { useState } from "react";
// import TicketAssignee from "./TicketAssignee";
// import { FaRegFlag } from "react-icons/fa";
// import TicketPriority from "./TicketPriority";
// import { FaCheckCircle } from "react-icons/fa";
// import TicketStatus from "./TicketStatus";

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
  // const [open, setOpen] = useState(false);
  // const [data, setData] = useState<any>();
  // const [modal, setModal] = useState<any>();
  const navigate = useNavigate();

  const handleViewClick = (params: any) => {
    navigate(`/ticket-information?id=${params.ticket_id}`);
  };

  // function handleAssigneClick(params: any, value: any) {
  //   setModal(value);
  //   setData(params);
  //   setOpen(true);
  // }

  function handlePriorityColor(priority: string): React.CSSProperties {
    switch (priority) {
      case "Critical":
        return { backgroundColor: "darkred" };
      case "High":
        return { backgroundColor: "red" };
      case "Medium":
        return { backgroundColor: "#ff9800" };
      case "Low":
        return { backgroundColor: "#4caf50" };
      default:
        return { backgroundColor: "#2196f3" };
    }
  }

  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 100 },
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
      renderCell: (params: any) => params.row.ticket_logs_latest?.ticket_status,
    },
    { field: "title", headerName: "Title", width: 200 },
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
    {
      field: "sub_category",
      headerName: "Category",
      width: 180,
      renderCell: (params: any) =>
        params.row.sub_category?.subcategory_description || "No Assignee",
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
                {/* {params.row.b_status !== "7" && (
                  <>
                    <Tooltip title="Assign Ticket">
                      <IconButton
                        onClick={() => handleAssigneClick(params.row, "assign")}
                      >
                        <FaRegUserCircle />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Change Priority">
                      <IconButton
                        onClick={() =>
                          handleAssigneClick(params.row, "priority")
                        }
                      >
                        <FaRegFlag />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Done This Ticket">
                      <IconButton
                        onClick={() => handleAssigneClick(params.row, "status")}
                      >
                        <FaCheckCircle />
                      </IconButton>
                    </Tooltip>
                  </>
                )} */}
              </>
            ),
          },
        ]
      : []),
  ];
  return (
    <>
      {/* <Dialog open={open} onClose={() => setOpen(false)}>
        {modal === "priority" ? (
          <TicketPriority data={data} setOpen={setOpen} refetch={refetch} />
        ) : modal === "status" ? (
          <TicketStatus data={data} setOpen={setOpen} refetch={refetch} />
        ) : (
          <TicketAssignee data={data} setOpen={setOpen} refetch={refetch} />
        )}
      </Dialog> */}

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
