import { Box, Grid, Typography } from "@mui/material";

export default function ReportStats({data}:any) {
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      sx={{ mb: 2, justifyContent: "center", flexWrap: "nowrap" }}
    >
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1">Total Tickets</Typography>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "green", fontWeight: "bold" }}
              >
               {data?.total_ticket_w_csat}
              </Typography>
              <Typography variant="subtitle1">Ticket with CSAT</Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{ color: "red", fontWeight: "bold" }}
              >
                {data?.total_ticket_wo_csat}
              </Typography>
              <Typography variant="subtitle1">Ticket without CSAT</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1">Total Percentage</Typography>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                {data?.total_passed_percentage} %
              </Typography>
              <Typography variant="subtitle1">Ticket with CSAT</Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{ color: "red", fontWeight: "bold" }}
              >
                {data?.total_passed_w_csat_percentage} %
              </Typography>
              <Typography variant="subtitle1">Ticket without CSAT</Typography>
            </Box>
          </Box>
        </Box>
      </Grid> 
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1">Customer Satisfaction</Typography>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                {data?.csat?.csat_pass}
              </Typography>
              <Typography variant="body2" color="text.secondary">{data?.csat?.csat_w_pass_percentage}%</Typography>
              <Typography variant="subtitle1">Passed</Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{ color: "red", fontWeight: "bold" }}
              >
                                {data?.csat?.csat_fail}
              </Typography>
              <Typography variant="body2" color="text.secondary">{data?.csat?.csat_w_fail_percentage}%</Typography>
              <Typography variant="subtitle1">Failed</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1">Average Handle Time</Typography>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                {data?.aht?.aht_pass}
              </Typography>
              <Typography variant="body2" color="text.secondary">{data?.aht?.aht_pass_percentage}%</Typography>
              <Typography variant="subtitle1">Passed</Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{ color: "red", fontWeight: "bold" }}
              >
                                {data?.aht?.aht_fail}
              </Typography>
              <Typography variant="body2" color="text.secondary">{data?.aht?.aht_fail_percentage}%</Typography>
              <Typography variant="subtitle1">Failed</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1">Service Level Agreement</Typography>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                {data?.sla?.sla_pass}
              </Typography>
              <Typography variant="body2" color="text.secondary">{data?.sla?.sla_pass_percentage}%</Typography>
              <Typography variant="subtitle1">Passed</Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{ color: "red", fontWeight: "bold" }}
              >
                                {data?.sla?.sla_fail}
              </Typography>
              <Typography variant="body2" color="text.secondary">{data?.sla?.sla_fail_percentage}%</Typography>
              <Typography variant="subtitle1">Failed</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
