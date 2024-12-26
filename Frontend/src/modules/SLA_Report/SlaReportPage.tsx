import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  Paper,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { CheckCircle, Cancel, AccessTime, Refresh } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { SLA } from "../../api/services/SLA";

const SlaReportPage = () => {
  const [slaReport, setSlaReport] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const slaReportFetchData = async () => {
    try {
      setLoading(true);
      const result = await SLA.getSLAReport();
      setSlaReport(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    slaReportFetchData();
  }, []);

  const slaFailCount = slaReport.sla_fail_count || 0;
  const slaPassCount = slaReport.sla_pass_count || 0;
  const tickets = Object.values(slaReport.sla_report || {});
  const totalCount = slaFailCount + slaPassCount;
  const passRate = totalCount ? (slaPassCount / totalCount) * 100 : 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          sx={{ textShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}
        >
          SLA Report
        </Typography>
        <IconButton onClick={slaReportFetchData} color="primary">
          <Refresh />
        </IconButton>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={4}
            sx={{
              background: "linear-gradient(135deg, #e0f7fa, #e3f2fd)",
              borderRadius: 3,
              p: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="text.primary"
                sx={{ opacity: 0.8 }}
              >
                Overall Performance
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="primary"
                  sx={{ textShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}
                >
                  {passRate.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary" ml={1}>
                  Pass Rate
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={passRate}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  background: "#e0f2f1",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#00796b" },
                }}
              />
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Typography
                  variant="body2"
                  color="success.main"
                  display="flex"
                  alignItems="center"
                >
                  <CheckCircle fontSize="small" sx={{ mr: 0.5 }} />
                  {slaPassCount} Passed
                </Typography>
                <Typography
                  variant="body2"
                  color="error.main"
                  display="flex"
                  alignItems="center"
                >
                  <Cancel fontSize="small" sx={{ mr: 0.5 }} />
                  {slaFailCount} Failed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              maxHeight: "800px",
              minHeight: "400px",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ opacity: 0.8 }}
            >
              Recent Tickets
            </Typography>
            {loading ? (
              <Typography variant="body2" color="text.secondary">
                Loading...
              </Typography>
            ) : tickets.length > 0 ? (
              <TableContainer>
                <Table size="medium">
                  <TableHead
                    sx={{
                      background: "linear-gradient(135deg, #e3f2fd, #e0f7fa)",
                    }}
                  >
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Ticket ID
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Response Time
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets.map((ticket: any) => (
                      <TableRow
                        key={ticket.id}
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f1f1f1",
                          },
                        }}
                      >
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.ticket_id}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>
                          <Chip
                            label={ticket.sla_passed ? "Passed" : "Failed"}
                            color={ticket.sla_passed ? "success" : "error"}
                            size="small"
                            sx={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                            icon={
                              ticket.sla_passed ? <CheckCircle /> : <Cancel />
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <AccessTime
                              fontSize="small"
                              color="action"
                              sx={{ mr: 0.5 }}
                            />
                            {ticket.time_difference || "N/A"}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", py: 2 }}
              >
                No tickets available.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SlaReportPage;
