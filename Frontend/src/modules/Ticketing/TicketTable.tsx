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
import { useEffect, useState } from "react";
import TicketStatus from "./TicketStatus";
import { SLA } from "../../api/services/SLA";

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

  const [priorityColorMap, setPriorityColorMap] = useState<any>({});

  // Predefined colors for priority levels
  const predefinedColors = [
    "#C62E2E", // Critical - Dark Red
    "#E53935", // High - Red
    "#FF9800", // Medium - Orange
    "#66BB6A", // Low - Green
    "#608BC1", // Default - Blue
  ];

  const getDataList = async () => {
    try {
      const response = await SLA.getSLA();

      const sortedPriorities = response.sort((a: any, b: any) => {
        const timeA = parseTimeToSeconds(a.response_time);
        const timeB = parseTimeToSeconds(b.response_time);
        return timeA - timeB; // Ascending order
      });

      const colorMap = sortedPriorities.reduce(
        (map: any, row: any, index: number) => {
          map[row.priority_label] = predefinedColors[index] || "#608BC1";
          return map;
        },
        {}
      );

      setPriorityColorMap(colorMap);
    } catch (error) {
      console.error("Error fetching SLA data:", error);
    }
  };

  function parseTimeToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  function handlePriorityColor(priority: string): React.CSSProperties {
    const backgroundColor = priorityColorMap[priority] || "#608BC1";
    return { backgroundColor };
  }

  const handleViewClick = (params: any) => {
    navigate(`/ticket-information?id=${params.ticket_id}`);
  };

  function handleAssigneClick(params: any) {
    setData(params);
    setOpen(true);
  }

  useEffect(() => {
    getDataList();
  }, []);

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
            ...handlePriorityColor(params.row.sla?.priority_label),
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
