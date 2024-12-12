import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useState } from "react";
import InputComponent from "../../components/common/InputComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useExecuteToast } from "../../context/ToastContext";
import { ticketApi } from "../../api/services/ticket";
import {
  updateTicketRemarks,
  updateTicketRemarksFormtype,
} from "../../schema/Ticket/updateTicketRemarks";

export default function TicketRemarks({ data , refetch }: any) {
  const [loading, setLoading] = useState(false);
  const toast = useExecuteToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateTicketRemarksFormtype>({
    resolver: yupResolver(updateTicketRemarks),
    defaultValues: { remarks: data?.remarks },
  });
  const onSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const response = await ticketApi.updateRemarks(data.id, formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        backgroundColor: "white",
        overflowY: "auto",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Ticket Action Taken
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, fontSize: "18px" }}>
          Updated By: {data?.updated_by?.name}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          name="remarks"
          label="Remarks"
          register={register}
          rows={25}
          multiline
          errors={errors}
          fullWidth
        />
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={false}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Update"
            )}
          </Button>
        </Grid>
      </form>
    </Box>
  );
}
