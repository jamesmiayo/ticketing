import { Box, DialogContent, DialogTitle, Typography } from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { AHTModalProps, Column, TotalStatus } from "../../interface";

export default function AHTModal({ data }: AHTModalProps) {
  const columns: Column[] = [
    {
      field: "facilitator",
      headerName: "Facilitator",
      width: 250,
      renderCell: (params) => params?.row?.assignee?.name || "N/A",
    },
    {
      field: "ticket_status",
      headerName: "Ticket Status",
      width: 250,
      renderCell: (params) => params?.row?.ticket_status,
    },
    {
      field: "time_difference",
      headerName: "Time Difference",
      width: 250,
      renderCell: (params) => params?.row?.time_difference,
    },
    {
      field: "created_at",
      headerName: "Created On",
      width: 250,
      renderCell: (params) => params?.row?.created_at,
    },
  ];

  const totalStatuses: TotalStatus[] = [
    {
      title: "Total In Progress",
      content: data?.ticket_logs?.filter((row) => row.status === 2).length,
      backgroundColor: "rgba(76, 175, 80, 0.1)",
    },
    {
      title: "Total Pending",
      content: data?.ticket_logs?.filter((row) => row.status === 3).length,
      backgroundColor: "rgba(63, 81, 181, 0.1)",
    },
    {
      title: "Total On Hold",
      content: data?.ticket_logs?.filter((row) => row.status === 4).length,
      backgroundColor: "rgba(156, 39, 176, 0.1)",
    },
  ];
  return (
    <>
      <DialogTitle>
        <Typography variant="h6" align="center" fontWeight="bold">
          Ticket Handle Time : {data.ticket_id}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          {totalStatuses.map((card, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: card.backgroundColor,
                boxShadow: 2,
                padding: 2,
                borderRadius: 2,
                flex: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {card.title}
              </Typography>
              <Typography variant="body2">{card.content}</Typography>
            </Box>
          ))}
        </Box>
        <TableComponents rows={data?.ticket_logs} columns={columns} />
      </DialogContent>
    </>
  );
}
