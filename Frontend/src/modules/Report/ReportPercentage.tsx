import { Box, Grid, Typography } from '@mui/material'

export default function ReportPercentage() {
  return (
    <>
     <Grid width={'100%'}>
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
              0
            </Typography>
            <Typography variant="subtitle1">Passed</Typography>
          </Box>

          <Box>
            <Typography
              variant="h4"
              sx={{ color: "red", fontWeight: "bold" }}
            >
              0
            </Typography>
            <Typography variant="subtitle1">Failed</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
    <Grid width={'100%'}>
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
              0
            </Typography>
            <Typography variant="subtitle1">Passed</Typography>
          </Box>

          <Box>
            <Typography
              variant="h4"
              sx={{ color: "red", fontWeight: "bold" }}
            >
              0
            </Typography>
            <Typography variant="subtitle1">Failed</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
    </>
  )
}
