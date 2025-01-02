import React, { useState, useEffect } from "react";
import { Button, Box, Grid, CircularProgress, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useExecuteToast } from "../../context/ToastContext";
import { sla, slaFormtype } from "../../schema/SLA/sla";
import dayjs from "dayjs";
import { SLA } from "../../api/services/SLA";

interface Props {
  refetch: () => void;
  onClose: () => void;
  defaultValues?: any;
}

const SLAForm: React.FC<Props> = ({ refetch, onClose, defaultValues }) => {
  const [loading, setLoading] = useState(false);
  const toast = useExecuteToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<slaFormtype>({
    resolver: yupResolver(sla),
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        priority_label: defaultValues.label,
        SLA_ID: defaultValues.data_id,
        response_time: dayjs(defaultValues.response_time, "HH:mm"),
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: slaFormtype) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        response_time: data.response_time?.format("HH:mm"),
      };
      if (defaultValues) {
        const response = await SLA.updateSLA({
          id: defaultValues.id,
          body: formattedData,
        });
        toast.executeToast(response.message, "top-center", true, {
          type: "success",
        });
      } else {
        const response = await SLA.newSLA(formattedData);
        toast.executeToast(response.message, "top-center", true, {
          type: "success",
        });
      }
      refetch();
      onClose();
    } catch (error) {
      toast.executeToast(
        "Failed to save FAQ header. Please try again.",
        "top-center",
        true,
        { type: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 1,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {defaultValues && (
              <Grid item xs={12}>
                <TextField
                  label="Priority ID"
                  value={defaultValues.data_id}
                  fullWidth
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Label"
                error={!!errors.priority_label}
                helperText={errors.priority_label?.message}
                {...control.register("priority_label")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="response_time"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    {...field}
                    label="Response Time"
                    ampm={false}
                    onChange={(newValue) => field.onChange(newValue)}
                    value={field.value}
                    slotProps={{
                      textField: {
                        error: !!errors.response_time,
                        helperText: errors.response_time?.message,
                        fullWidth: true,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : defaultValues ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default SLAForm;
