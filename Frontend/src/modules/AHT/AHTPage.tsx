import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AHTTicketTable from "./AHTTicketTable";
import { AHT } from "../../api/services/aht";
import { SLA } from "../../api/services/SLA";
import { SubmitHandler, useForm } from "react-hook-form";
import { aht, ahtFormtype } from "../../schema/Aht/aht";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AHTPage() {
  const [data, setData] = useState<any>([]);
  const [priority, setPriority] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ahtFormtype>({
    resolver: yupResolver(aht),
  });

  const fetchAHTData = async (params?: any) => {
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

  const fetchPriority = async () => {
    try {
      const response = await SLA.getSLA();
      const data = response.map((row: any) => {
        return { value: row.id, label: row.priority_label };
      });
      setPriority(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPriority();
    fetchAHTData();
  }, []);

  const userId = searchParams.get("user_id");

  const onSubmit: SubmitHandler<ahtFormtype> = async (formData: any) => {
    setLoading(true);
    try {
      fetchAHTData(formData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    fetchAHTData();
  };

  const ticketSearchFilter = [
    {
      name: "ticket_id",
      label: "Ticket ID",
      register: register,
      errors: errors,
      type: "text",
    },
    {
      name: "priority",
      label: "Priority",
      register: register,
      errors: errors,
      control: control,
      options: priority,
      type: "select",
    },
    {
      name: "start_date",
      label: "Start Date",
      register: register,
      control: control,
      errors: errors,
      type: "date",
    },
    {
      name: "end_date",
      label: "End Date",
      register: register,
      control: control,
      errors: errors,
      type: "date",
    },
  ];

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
          Ticket Handle Time
        </Typography>
        {userId ? (
          <AHTTicketTable />
        ) : (
          <AHTTicketTable
            ticketSearchFilter={ticketSearchFilter}
            data={data?.data}
            isLoading={loading}
            priority={priority}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        )}
      </Box>
    </>
  );
}
