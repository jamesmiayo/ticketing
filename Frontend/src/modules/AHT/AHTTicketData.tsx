import {
  Box,
  Button,
  Chip,
  Dialog,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaHistory } from "react-icons/fa";
import { Cancel, CheckCircle } from "@mui/icons-material";
import AHTModal from "./AHTModal";
import { GiClick } from "react-icons/gi";

export default function AHTTicketData({ data }: any) {
  const [open, setOpen] = useState(false);

  const metrics = [
    { label: "Idle Time", value: data?.aht_idle_time },
    { label: "Lead Time", value: data?.aht_lead_time },
    { label: "Total Duration", value: data?.aht_total_duration_time },
  ];
  const requestorData = [
    {
      label: "Branch Name",
      value: data?.requestor?.branch?.branch_description,
    },
    {
      label: "Division Name",
      value:
        data?.requestor?.section?.department?.division?.division_description,
    },
  ];
  const facilitatorData = [
    {
      label: "Branch Name",
      value: data?.ticket_logs_latest?.assignee?.branch?.branch_description,
    },
    {
      label: "Division Name",
      value:
        data?.ticket_logs_latest?.assignee?.section?.department?.division
          ?.division_description,
    },
  ];

  return (
    <>
      {data?.length !== 0 ? (
        <Box>
          <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
            <AHTModal data={data} setOpen={open} />
          </Dialog>
          <Box sx={{ width: "100%", paddingX: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                paddingY: 2,
              }}
            >
              <Chip
                label={data?.aht_passed === 1 ? "Passed" : "Failed"}
                color={data?.aht_passed === 1 ? "success" : "error"}
                size="medium"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
                icon={data?.aht_passed === 1 ? <CheckCircle /> : <Cancel />}
              />
            </Box>
            <Grid container spacing={4} justifyContent="center">
              {metrics.map((metric, index) => (
                <Grid item key={index}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    align="center"
                  >
                    {metric.label}
                  </Typography>
                  <Typography variant="h6" align="center" fontWeight="bold">
                    {metric.value} m
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ padding: 2 }}>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Ticket Name: </strong> {data?.title}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Category: </strong>{" "}
                {data?.sub_category?.category?.category_description}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Sub Category: </strong>{" "}
                {data?.sub_category?.subcategory_description}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Priority: </strong>{" "}
                <Chip
                  label={data?.sla?.priority_label}
                  size="small"
                  sx={{
                    backgroundColor: data?.sla?.priority_color,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                />
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Response Time: </strong> {data?.sla?.response_time}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Requestor: </strong> {data?.requestor?.name}
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {facilitatorData.map((metric, index) => (
                  <Grid item key={index}>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      fontWeight="bold"
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      align="center"
                    >
                      {metric.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Facilitator: </strong>{" "}
                {data?.ticket_logs_latest?.assignee?.name}
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {requestorData.map((metric, index) => (
                  <Grid item key={index}>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      fontWeight="bold"
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      align="center"
                    >
                      {metric.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Created On: </strong> {data?.created_at}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingRight: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaHistory />}
                onClick={() => setOpen(true)}
              >
                Ticket Logs
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              marginBottom: 2,
              marginTop: 15,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <GiClick
              style={{
                color: "white",
                backgroundColor: "rgba(63, 81, 181, 1)",
                padding: 10,
                borderRadius: "50%",
              }}
              size={75}
            />
          </Box>
          <Paper sx={{ marginX: 5, padding: 1 , backgroundColor: "rgba(63, 81, 181, 0.3)" }}>
            <Typography variant="subtitle1" color="textSecondary" sx={{ textAlign: "center" }}>
              Click Ticket on the Ticket Table to check information.
            </Typography>
          </Paper>
        </>
      )}
    </>
  );
}
