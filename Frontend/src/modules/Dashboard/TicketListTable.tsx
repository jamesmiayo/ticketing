import { Box, Button, Paper, Typography } from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useNavigate } from "react-router-dom";

export default function TicketListTable({ data, isLoading }: any) {
  const navigate = useNavigate();

  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 80 },
    {
      field: "sub_category",
      headerName: "Category",
      width: 120,
      valueGetter: (params: any) => params.category.category_description,
    },
    { field: "title", headerName: "Title", width: 140 },
    {
      field: "ticket_logs_latest",
      headerName: "Status",
      width: 180,
      valueGetter: (params: any) => params?.ticket_status,
    },
  ];

  const handleNavigateTicket = () => {
    navigate("/ticket");
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        background: "white",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        flex: 1,
        minWidth: "30%",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Ticket List</Typography>
          <Button
            onClick={handleNavigateTicket}
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }}
          >
            View More
          </Button>
        </Box>
        <TableComponents
          columns={columns}
          rows={data}
          height={350}
          isLoading={isLoading}
        />
      </Box>
    </Paper>
  );
}
