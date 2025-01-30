import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useState } from "react";
import TicketCard from "../Ticketing/TicketCard";
import { cardColors } from "../../constants/constants";

export default function BranchListTable({ data, isLoading }: any) {
  const [open, setOpen] = useState(false);
  const [dataTicket, setDataTicket] = useState<any>([]);
  const columns = [
    { field: "branch_name", headerName: "Branch Name", width: 250 },
    { field: "total_tickets", headerName: "Total Ticket", width: 250 },
  ];

  function handleViewClick(data: any) {
    setDataTicket(data.row);
    setOpen(true);
  }
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogTitle>Total Ticket in {dataTicket.branch_name}</DialogTitle>
        </Box>

        <DialogContent>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {dataTicket?.status_counts?.formatted_counts &&
              dataTicket?.status_counts?.formatted_counts.map(
                ({ label, value }: any, index: number) => (
                  <TicketCard
                    key={index}
                    title={label}
                    count={value}
                    color={cardColors[index]}
                  />
                )
              )}
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
          </Box>
          <TableComponents
            columns={columns}
            rows={data?.total_count_with_branch}
            height={350}
            isLoading={isLoading}
            onRowClick={handleViewClick}
          />
        </Box>
      </Paper>
    </>
  );
}
