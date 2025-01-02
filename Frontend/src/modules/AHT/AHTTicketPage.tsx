import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AHT } from "../../api/services/aht";
import { Box, Typography } from "@mui/material";
import TableComponents from "../../components/common/TableComponents";

export default function AHTUserPage() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await AHT.getAHT({ userId: userId });
      const data = response?.data?.map((row: any, index: number) => ({
        id: index,
        ...row,
     }));
      setData(data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 140,
      renderCell: (params: any) => params?.row?.date,
    },
    { field: "total_in_progress", headerName: "Ticket In Progress", width: 140 , renderCell: (params: any) => params?.row?.tickets_in_progress, },
    { field: "total_done", headerName: "Ticket Done", width: 140 , renderCell: (params: any) => params?.row?.tickets_done, },
    { field: "total_ticket", headerName: "Total Ticket", width: 140 , renderCell: (params: any) => params?.row?.total_tickets,},
    { field: "total_duration", headerName: "Total Duration", width: 140 , renderCell: (params: any) => params?.row?.total_duration },
  ];
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "white",
            padding: 2,
            height: 200,
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <img src={data.profile} alt="Profile" />
          <Box sx={{ marginLeft: 20 }}>
            <Typography>Name: {data.name}</Typography>
            <Typography>Name: {data.name}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: 2,
            height: 200,
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ marginLeft: 20 }}>
            <Typography>Total AHT Passed on this month</Typography>
          </Box>
          <Box sx={{ marginLeft: 20 }}>
            <Typography>Total AHT Failed on this month</Typography>
          </Box>
        </Box>
      </Box>
      <TableComponents
        rows={data}
        isLoading={isLoading}
        columns={columns}
        height={700}
      />
    </Box>
  );
}
