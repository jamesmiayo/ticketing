import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

export default function CSATStats({data , isLoading}:any) {
  return (
    <Grid container spacing={3} sx={{ mb: 2 }}>
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: 3,
          textAlign: "center",
        }}
      >
        {data?.csat_passed ? <FaCheckCircle color={'green'} size={40}/> : <RxCrossCircled color={'red'} size={40}/>}
        <Typography variant="subtitle1">Customer Satisfaction Assessment</Typography>
      </Box>
    </Grid>
  
    <Grid item xs={12} md={4}>
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
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
           {isLoading ? <CircularProgress size={30}/> : data?.total_answered}
        </Typography>
        <Typography variant="subtitle1">Answered questions</Typography>
      </Box>
    </Grid>
  
    <Grid item xs={12} md={4}>
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
          sx={{ color: "#f44336", fontWeight: "bold" }}
        >
                    {isLoading ? <CircularProgress size={30}/> : data?.total_unresponse}
        </Typography>
        <Typography variant="subtitle1">Unanswered questions</Typography>
      </Box>
    </Grid>
  </Grid>
  
  )
}
