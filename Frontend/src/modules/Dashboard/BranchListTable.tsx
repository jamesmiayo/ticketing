import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import TicketCard from "../Ticketing/TicketCard";
import { cardColors } from "../../constants/constants";

export default function BranchListTable({ data, isLoading }: any) {
  const [open, setOpen] = useState(false);
  const [dataTicket, setDataTicket] = useState<any>([]);
  const columns = [
    { field: "branch_name", headerName: "Branch Name", width: 200 },
    { field: "total_tickets", headerName: "Total Ticket", width: 140 },
    {
      field: "test",
      headerName: "See More",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => handleViewClick(params.row)}>
            <FaEye />
          </IconButton>
        </>
      ),
    },
  ];

  function handleViewClick(data: any) {
    setDataTicket(data);
    setOpen(true);
  }
  return (
    <>
     <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <DialogTitle>Total Ticket in {dataTicket.branch_name}</DialogTitle>
  <Box sx={{  backgroundColor: "rgba(76, 175, 80, 0.1)" , borderRadius: 2, padding: 2 , margin: 2}}>
    <Typography sx={{ fontSize: '15px' ,  fontWeight: "600", }}>Unassigned Ticket: {dataTicket?.status_counts?.unassigned_ticket} </Typography>
  </Box>
</Box>

    <DialogContent>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(150px, 1fr))',
            gap: '16px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            {dataTicket?.status_counts?.formatted_counts && dataTicket?.status_counts?.formatted_counts.map(({ label, value } : any, index : number) => (
                <TicketCard key={index} title={label} count={value}  color={cardColors[index]}/>
            ))}
        </div>
    </DialogContent>
</Dialog>

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
            <Typography variant="h6">Branch List</Typography>
            <Typography variant="h6">
              Total Ticket Without Branch:{" "}
              {data?.total_count_without_branch || 0}
            </Typography>
          </Box>
          <TableComponents
            columns={columns}
            rows={data?.total_count_with_branch}
            height={350}
            isLoading={isLoading}
          />
        </Box>
      </Paper>
    </>
  );
}
