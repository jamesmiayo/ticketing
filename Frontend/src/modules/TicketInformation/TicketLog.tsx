import { Box, Table } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function TicketLog({ data }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        backgroundColor: "white",
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Assign By</TableCell>
              <TableCell>Updated By</TableCell>
              <TableCell>Time Difference</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.ticket_statuses?.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>{row?.id}</TableCell>
                <TableCell>{row?.ticket_status}</TableCell>
                <TableCell>{row?.remarks}</TableCell>
                <TableCell>{row?.assignee?.name}</TableCell>
                <TableCell>{row?.updated_by?.name}</TableCell>
                <TableCell>{row?.time_difference}</TableCell>
                <TableCell>{row?.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
