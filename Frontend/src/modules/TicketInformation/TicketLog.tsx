import { Box, Typography, Paper, Divider, Avatar, Stack } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

export default function TicketLog({ data }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        backgroundColor: "white",
        overflowY: "auto",
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Ticket Log
      </Typography>
      {data?.ticket_statuses?.map((row: any) => (
        <Paper
          key={row.id}
          elevation={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            mb: 2,
            borderRadius: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} mb={1}>
            <Avatar
              src={row?.assignee?.profile_picture}
              sx={{
                cursor: "pointer",
                width: 40,
                height: 40,
                marginLeft: 2,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {row?.assignee?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDistanceToNow(new Date(row?.created_at), {
                  addSuffix: true,
                })}
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">
            <strong>Status:</strong> {row?.ticket_status}
          </Typography>
          <Typography variant="body1">
            <strong>Remarks:</strong> {row?.remarks || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Updated by: {row?.updated_by?.name || "Unknown"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Time Difference: {row?.time_difference || "N/A"}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
