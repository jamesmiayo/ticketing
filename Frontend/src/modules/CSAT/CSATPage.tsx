import { useEffect, useState } from "react";
import { CSAT } from "../../api/services/csat";
import { Box, Dialog,  Typography } from "@mui/material";
import CSATBarGraph from "./CSATBarGraph";
import CSATPercentage from "./CSATPercentage";
import { SubmitHandler } from "react-hook-form";
import CSATStats from "./CSATStats";
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiLaughing } from "react-icons/bs";
import { BsEmojiNeutral } from "react-icons/bs";
import TableComponents from "../../components/common/TableComponents";
import { FaStar } from "react-icons/fa";
import CSATTicketSatisfactoryData from "./CSATTicketSatisfactoryData";
import GlobalFilterComponents from "../../components/common/GlobalFilterComponents";

export default function CSATPage() {
  const [csat, setCsat] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);

  const fetchData = async (params?: any) => {
    setIsLoading(true);
    try {
      const response = await CSAT.getCSAT(params);
      setCsat(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    console.log(formData);
    try {
      await fetchData(formData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "ticket_id",
      headerName: "Ticket ID",
      width: 250,
      renderCell: (params: any) => params?.row?.ticket_id,
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
      field: "satisfactory",
      headerName: "Overall Satisfaction",
      width: 250,
      renderCell: (params: any) => {
        return (
          <div>
            {params?.row?.ticket_satisfactory === null ? (
              "Unanswered Question"
            ) : (
              <>
                {params?.row?.ticket_satisfactory?.satisfactory_1}{" "}
                <FaStar color={"rgba(31, 80, 154 , 0.5)"} />
              </>
            )}
          </div>
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

  const handleRowClick = (params: any) => {
    setRowData(params.row);
    setOpen(true);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
      >
        <CSATTicketSatisfactoryData data={rowData} />
      </Dialog>

      <Box
        component="main"
        sx={{
          p: 3,
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Ticket Customer Satisfaction
        </Typography>
        <GlobalFilterComponents onSubmit={onSubmit} onReset={() => fetchData()} />
        <Box>
          <CSATStats data={csat} isLoading={isLoading} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              marginBottom: 1,
              alignItems: "center",
            }}
          >
            <CSATPercentage
              data={csat?.average_satisfactory}
              isPassed={csat?.csat_passed}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TableComponents
                rows={csat?.data}
                columns={columns}
                onRowClick={handleRowClick}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                backgroundColor: "white",
                width: "25%",
                borderRadius: 3,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "rgba(31, 80, 154 , 1)",
                }}
              >
                Total Ticket Satisfactory
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsEmojiLaughing color={"green"} size={40} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {csat?.total_satisfied} Satisfied
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsEmojiNeutral color={"rgba(31, 80, 154 , 0.5)"} size={40} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {csat?.total_neutral} Neutral
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsEmojiFrown color={"red"} size={40} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {csat?.total_unsatisfied} Not Satisfied
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: 2,
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CSATBarGraph data={csat?.satisfactory} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
