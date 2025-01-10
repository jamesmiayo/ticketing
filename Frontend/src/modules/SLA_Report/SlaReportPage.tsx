import {
  Box,
  Typography,
  Chip,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  AccessTime,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { SLA } from "../../api/services/SLA";
import TableComponents from "../../components/common/TableComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserBranchSection } from "../../schema/User/UpdateUserBranchSection";
import GlobalFilterComponents from "../../components/common/GlobalFilterComponents";

const SlaReportPage = () => {
  const [slaReport, setSlaReport] = useState<any>({});
  // const [loading, setLoading] = useState(true);


  const {
    reset,
  } = useForm<any>({
    resolver: yupResolver(updateUserBranchSection),
  });

  const slaReportFetchData = async (formData?:any) => {
    try {
      // setLoading(true);
      const result = await SLA.getSLAReport(formData);
      setSlaReport(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    slaReportFetchData();
  },[]);

  const tickets = Object.values(slaReport.sla_report || {});

  // const ticketSearchFilter = [
  //   {
  //     name: "ticket_id",
  //     label: "Ticket ID",
  //     register: register,
  //     errors: errors,
  //     type: "text",
  //   },
  //   // {
  //   //   name: "priority",
  //   //   label: "Priority",
  //   //   register: register,
  //   //   errors: errors,
  //   //   control: control,
  //   //   type: "select",
  //   // },
  //   {
  //     name: "start_date",
  //     label: "Start Date",
  //     register: register,
  //     control: control,
  //     errors: errors,
  //     type: "date",
  //   },
  //   {
  //     name: "end_date",
  //     label: "End Date",
  //     register: register,
  //     control: control,
  //     errors: errors,
  //     type: "date",
  //   },
  // ];

  const columns = [
    {
      field: "ticket_id",
      headerName: "Ticket ID",
      width: 250,
      renderCell: (params: any) => params?.row?.ticket_id,
    },
    {
      field: "sla_passed",
      headerName: "SLA Passed",
      width: 250,
      renderCell: (params: any) => {
        return (
          <Chip
            label={params?.row?.sla_passed ? "Passed" : "Failed"}
            color={params?.row?.sla_passed ? "success" : "error"}
            size="small"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            icon={params?.row?.sla_passed ? <CheckCircle /> : <Cancel />}
          />
        );
      },
    },
    {
      field: "ticket_name",
      headerName: "Ticket Name",
      width: 250,
      renderCell: (params: any) => params?.row?.title,
    },
    {
      field: "assigneed",
      headerName: "Facilitator",
      width: 250,
      renderCell: (params: any) =>
        params?.row?.ticket_logs_latest?.assignee?.name,
    },
    {
      field: "response_time",
      headerName: "Response Time",
      width: 250,
      renderCell: (params: any) => {
        return (
          <>
            <AccessTime fontSize="small" color="action" sx={{ mr: 1 }} />
            {params?.row?.time_difference || "N/A"}
          </>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created On",
      width: 250,
      renderCell: (params: any) => params?.row?.created_at,
    },
  ];

  const onSubmit = async (formData: any) => {
    // setLoading(true);
    try {
      slaReportFetchData(formData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      // setLoading(false);
    }
  };
  const handleReset = () => {
    slaReportFetchData();
    reset();
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          p: 3,
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Ticket Service Level Agreement
        </Typography>
        <GlobalFilterComponents onSubmit={onSubmit} onReset={handleReset} />
        <TableComponents rows={tickets} columns={columns} height={700} />
      </Box>
    </>

    // <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    //   {/* Header */}
    //   <Box
    //     display="flex"
    //     justifyContent="space-between"
    //     alignItems="center"
    //     mb={3}
    //   >
    //     <Typography
    //       variant="h4"
    //       fontWeight="bold"
    //       color="primary"
    //       sx={{ textShadow: "0px 4px 8px rgba(0,0,0,0.2)" }}
    //     >
    //       SLA Report
    //     </Typography>
    //   </Box>

    //   {/* Filters */}
    //   <Box
    //     display="flex"
    //     flexDirection={{ xs: "column", md: "row" }}
    //     alignItems="center"
    //     justifyContent="space-between"
    //     mb={4}
    //     gap={2}
    //   >
    //     <ButtonGroup variant="outlined" color="primary">
    //       <Button onClick={() => setisPassed("")} disabled={isPassed === ""}>
    //         All
    //       </Button>
    //       <Button onClick={() => setisPassed("1")} disabled={isPassed === "1"}>
    //         Passed
    //       </Button>
    //       <Button onClick={() => setisPassed("0")} disabled={isPassed === "0"}>
    //         Failed
    //       </Button>
    //     </ButtonGroup>
    //     <Box display="flex" gap={2} alignItems="center">
    //       <TextField
    //         label="Start Date"
    //         type="date"
    //         value={startDate}
    //         onChange={handleDateChange(setStartDate)}
    //         InputLabelProps={{ shrink: true }}
    //         size="small"
    //       />
    //       <TextField
    //         label="End Date"
    //         type="date"
    //         value={endDate}
    //         onChange={handleDateChange(setEndDate)}
    //         InputLabelProps={{ shrink: true }}
    //         size="small"
    //       />
    //       <Button
    //         variant="contained"
    //         startIcon={<FilterList />}
    //         onClick={slaReportFetchData}
    //       >
    //         Apply Filters
    //       </Button>
    //     </Box>
    //   </Box>

    //   <Grid container spacing={4}>
    //     {/* Performance Card */}
    //     <Grid item xs={12} md={4}>
    //       <Card
    //         elevation={6}
    //         sx={{
    //           background: "linear-gradient(135deg, #e0f7fa, #e8f5e9)",
    //           borderRadius: 4,
    //           p: 3,
    //         }}
    //       >
    //         <CardContent>
    //           <Typography variant="h6" fontWeight="bold" gutterBottom>
    //             Overall Performance
    //           </Typography>
    //           <Box display="flex" alignItems="center" mb={2}>
    //             <Typography
    //               variant="h2"
    //               fontWeight="bold"
    //               color="primary"
    //               sx={{ textShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}
    //             >
    //               {passRate.toFixed(1)}%
    //             </Typography>
    //             <Typography variant="body2" color="text.secondary" ml={2}>
    //               Pass Rate
    //             </Typography>
    //           </Box>
    //           <LinearProgress
    //             variant="determinate"
    //             value={passRate}
    //             sx={{
    //               height: 12,
    //               borderRadius: 6,
    //               background: "#e3f2fd",
    //               "& .MuiLinearProgress-bar": { backgroundColor: "#00796b" },
    //             }}
    //           />
    //           <Box display="flex" justifyContent="space-between" mt={3}>
    //             <Typography
    //               variant="body1"
    //               color="success.main"
    //               display="flex"
    //               alignItems="center"
    //             >
    //               <CheckCircle fontSize="small" sx={{ mr: 1 }} />
    //               {slaPassCount} Passed
    //             </Typography>
    //             <Typography
    //               variant="body1"
    //               color="error.main"
    //               display="flex"
    //               alignItems="center"
    //             >
    //               <Cancel fontSize="small" sx={{ mr: 1 }} />
    //               {slaFailCount} Failed
    //             </Typography>
    //           </Box>
    //         </CardContent>
    //       </Card>
    //     </Grid>

    //     {/* Tickets Table */}
    //     <Grid item xs={12} md={8}>
    //       <Paper
    //         elevation={6}
    //         sx={{
    //           p: 3,
    //           borderRadius: 4,
    //           background: "#ffffff",
    //           boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    //           maxHeight: "600px",
    //           overflowY: "auto",
    //         }}
    //       >
    //         <Typography variant="h6" fontWeight="bold" gutterBottom>
    //           Recent Tickets
    //         </Typography>
    //         <Divider sx={{ mb: 2 }} />
    //         {loading ? (
    //           <Box
    //             display="flex"
    //             justifyContent="center"
    //             alignItems="center"
    //             height="100%"
    //           >
    //             <CircularProgress />
    //           </Box>
    //         ) : tickets.length > 0 ? (
    //           <TableContainer>
    //             <Table>
    //               <TableHead
    //                 sx={{
    //                   background: "linear-gradient(135deg, #f3e5f5, #e0f7fa)",
    //                 }}
    //               >
    //                 <TableRow>
    //                   <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
    //                   <TableCell sx={{ fontWeight: "bold" }}>
    //                     Ticket ID
    //                   </TableCell>
    //                   <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
    //                   <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
    //                   <TableCell sx={{ fontWeight: "bold" }}>
    //                     Response Time
    //                   </TableCell>
    //                 </TableRow>
    //               </TableHead>
    //               <TableBody>
    //                 {tickets.map((ticket: any) => (
    //                   <TableRow
    //                     key={ticket.id}
    //                     hover
    //                     sx={{
    //                       "&:hover": {
    //                         backgroundColor: "#f9f9f9",
    //                       },
    //                     }}
    //                   >
    //                     <TableCell>{ticket.id}</TableCell>
    //                     <TableCell>{ticket.ticket_id}</TableCell>
    //                     <TableCell>{ticket.title}</TableCell>
    //                     <TableCell>
    //                       <Chip
    //                         label={ticket.sla_passed ? "Passed" : "Failed"}
    //                         color={ticket.sla_passed ? "success" : "error"}
    //                         size="small"
    //                         sx={{
    //                           fontWeight: "bold",
    //                           textTransform: "uppercase",
    //                         }}
    //                         icon={
    //                           ticket.sla_passed ? <CheckCircle /> : <Cancel />
    //                         }
    //                       />
    //                     </TableCell>
    //                     <TableCell>
    //                       <Box display="flex" alignItems="center">
    //                         <AccessTime
    //                           fontSize="small"
    //                           color="action"
    //                           sx={{ mr: 1 }}
    //                         />
    //                         {ticket.time_difference || "N/A"}
    //                       </Box>
    //                     </TableCell>
    //                   </TableRow>
    //                 ))}
    //               </TableBody>
    //             </Table>
    //           </TableContainer>
    //         ) : (
    //           <Typography
    //             variant="body2"
    //             color="text.secondary"
    //             textAlign="center"
    //             py={2}
    //           >
    //             No tickets available.
    //           </Typography>
    //         )}
    //       </Paper>
    //     </Grid>
    //   </Grid>
    // </Container>
  );
};

export default SlaReportPage;
