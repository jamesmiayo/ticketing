import { useEffect, useState } from "react";
import PolarAreaChart from "./PolarAreaChart";
import { Box, Typography } from "@mui/material";
import GlobalFilterComponents from "../../components/common/GlobalFilterComponents";
import { SubmitHandler } from "react-hook-form";
import ReportStats from "./ReportStats";
import { REPORT } from "../../api/services/reports";

export default function ReportPage() {
  const [ data , setData ] = useState<any>([]);

  const fetchData = async (params?:any) => {
    try {
      const response = await REPORT.getReport(params);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      const response = fetchData(formData);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
    }
  };

  return (
    <Box
      component="main"
      sx={{
        p: 3,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Ticket Reports
      </Typography>
      <GlobalFilterComponents onSubmit={onSubmit} />
      <Box sx={{ minHeight: '80vh' , gap: 2 , backgroundColor: "white", borderRadius: 2 }}>
        <Box sx={{ display: 'flex' , padding: 2 }}>
        <Box sx={{ width: '25%' }}>
          <ReportStats data={data}/>
        </Box>
        <Box sx={{ width: '100%' , justifyContent: 'center' , display: 'flex' , alignContent: 'center'}}>
          <PolarAreaChart />
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
