import { Box, DialogContent, DialogTitle, Typography } from "@mui/material";
import TableComponents from "../../components/common/TableComponents";

export default function AHTModal({ data }: any) {
  const columns = [
    {
      field: "facilitator",
      headerName: "Facilitator",
      width: 250,
      renderCell: (params: any) => params?.row?.assignee?.name || 'N/A',
    },
    {
        field: "ticket_status",
        headerName: "Ticket Status",
        width: 250,
        renderCell: (params: any) => params?.row?.ticket_status,
      },
    {
        field: "time_difference",
        headerName: "Time Difference",
        width: 250,
        renderCell: (params: any) => params?.row?.time_difference,
      },
      {
        field: "created_at",
        headerName: "Created On",
        width: 250,
        renderCell: (params: any) => params?.row?.created_at,
      },
  ];

  const totalStatuses = [
    { title: 'Total In Progress', content: data?.ticket_logs.filter((row: any) => row.status === 2).length },
  { title: 'Total Pending', content: data?.ticket_logs.filter((row: any) => row.status === 3).length },
  { title: 'Total On Hold', content: data?.ticket_logs.filter((row: any) => row.status === 4).length },
]
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
      display: 'flex',
      gap: 2,
      justifyContent: 'space-between', 
      marginBottom: 2,
    }}
  >
    {totalStatuses.map((card, index) => (
      <Box
        key={index}
        sx={{
          backgroundColor: 'white',
          boxShadow: 2,
          padding: 2,
          borderRadius: 2,
          flex: 1, 
          textAlign: 'center',
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
