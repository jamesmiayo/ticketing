import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AHTTicketTable from "./AHTTicketTable";
import { AHT } from "../../api/services/aht";
import { SubmitHandler } from "react-hook-form";
import { ahtFormtype } from "../../schema/Aht/aht";
import GlobalFilterComponents from "../../components/common/GlobalFilterComponents";
import AHTStats from "./AHTStats";
import AHTTicketData from "./AHTTicketData";
import { AHTData, AHTFormType, RowData } from "../../interface";

export default function AHTPage() {
  const [data, setData] = useState<AHTData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rowData, setRowData] = useState<AHTData | null>(null);
  const fetchAHTData = async (params?: Partial<AHTFormType>) => {
    setLoading(true);
    try {
      const response = await AHT.getAHT(params);

      setData(response);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAHTData();
  }, []);

  const onSubmit: SubmitHandler<ahtFormtype> = async (formData) => {
    setLoading(true);
    try {
      fetchAHTData(formData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (params: RowData) => {
    setRowData(params.row);
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
          Ticket Average Handle Time
        </Typography>
        <GlobalFilterComponents
          onSubmit={onSubmit}
          onReset={() => fetchAHTData()}
        />
        <AHTStats data={data?.analytics} isLoading={loading} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ width: "25%", backgroundColor: "white", borderRadius: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ paddingTop: 2, textAlign: "center" }}
            >
              Ticket ID : {rowData?.ticket_id}
            </Typography>
            <AHTTicketData data={rowData} isLoading={loading} />
          </Box>
          <Box sx={{ width: "75%" }}>
            <AHTTicketTable
              data={data?.data}
              isLoading={loading}
              onSubmit={onSubmit}
              onRowClick={handleRowClick}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
