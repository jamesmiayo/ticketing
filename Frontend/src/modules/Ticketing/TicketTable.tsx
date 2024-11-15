import { Card, IconButton, Skeleton } from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { GridRenderCellParams } from "@mui/x-data-grid";

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
}: any) {
  const navigate = useNavigate();

  const handleViewClick = (params: any) => {
    navigate(`/ticket-information?id=${params.ticket_id}`);
  };

  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 140 },
    { field: "assignee", headerName: "Assignee", width: 140 },
    { field: "title", headerName: "Title", width: 220 },
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
            width: 110,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
              <IconButton onClick={() => handleViewClick(params.row)}>
                <FaEye />
              </IconButton>
            ),
          },
        ]
      : []),
  ];
  return (
    <>
      {isLoading ? (
        <Card sx={{ width: "100%", display: "flex" }}>
          <Skeleton variant="rectangular" sx={{ flexGrow: 1, height: 500 }} />
        </Card>
      ) : (
        <TableComponents
          columns={columns}
          rows={tickets}
          onPageChange={onPageChange}
          pageProps={pageProps}
          height={500}
          customInputs={customInputs}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
