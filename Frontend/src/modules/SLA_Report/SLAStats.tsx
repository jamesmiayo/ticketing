import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import SLaDoughnutGraph from './SLaDoughnutGraph'

export default function SLAStats({data , isLoading} :any) {
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
          <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }}>
          {isLoading ? <CircularProgress size={30} /> : data?.total_count}
        </Typography>
        <Typography variant="subtitle1">
          Total Tickets
        </Typography>
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
        <Typography variant="h4" sx={{ color: "green", fontWeight: "bold" }}>
        {isLoading ? <CircularProgress size={30} /> : data?.sla_pass_count}
        </Typography>
        <Typography variant="subtitle1">
          Passed
        </Typography>
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
        <Typography
          variant="h4"
          sx={{ color: "red", fontWeight: "bold" }}
        >
        {isLoading ? <CircularProgress size={30} /> : data?.sla_fail_count}
        </Typography>
        <Typography variant="subtitle1">Failed</Typography>
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
          <SLaDoughnutGraph rowData={data} isLoading={isLoading}/>
      </Box>
    </Grid>
  </Grid>
  
  )
}
