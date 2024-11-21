import { IconButton } from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegUserCircle } from "react-icons/fa";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import TicketAssignee from "./TicketAssignee";

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
  const navigate = useNavigate();

  const handleViewClick = (params: any) => {
    navigate(`/ticket-information?id=${params.ticket_id}`);
  };

  function handleAssigneClick(params: any) {
    setData(params);
    setOpen(true);
  }

  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 140 },
    { field: "assignee", headerName: "Assignee", width: 140 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "category", headerName: "Category", width: 180 },
    { field: "subCategory", headerName: "Sub Category", width: 180 },
    { field: "status", headerName: "Status", width: 110 },
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
                <IconButton onClick={() => handleViewClick(params.row)}>
                  <FaEye />
                </IconButton>
                <IconButton onClick={() => handleAssigneClick(params.row)}>
                  <FaRegUserCircle />
                </IconButton>
              </>
            ),
          },
        ]
      : []),
  ];
  return (
    <>
      <TicketAssignee
        data={data}
        open={open}
        setOpen={setOpen}
        refetch={refetch}
      />
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
