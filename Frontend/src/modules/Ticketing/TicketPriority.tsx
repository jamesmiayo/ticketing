import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import SelectItem from "../../components/common/SelectItem";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
import { updatePrioritySchema } from "../../schema/Ticket/updatePriority";
import { useEffect, useState } from "react";
import { SLA } from "../../api/services/SLA";

export default function TicketPriority({ data, setOpen, refetch }: any) {
  const toast = useExecuteToast();
  const [dataList, setDataList] = useState([]);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(updatePrioritySchema),
  });

  const getDataList = async () => {
    try {
      const response = await SLA.getSLA();
      const dataOption = response?.map((row: any) => {
        return { value: row.SLA_ID, label: row.priority_label };
      });
      setDataList(dataOption);
    } catch (error) {
      console.error("Error fetching SLA:", error);
      throw error;
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const onSubmit = async (formData: any) => {
    setOpen(false);
    try {
      const response = await ticketApi.updatePriority(data.id, formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      refetch();
      reset();
    } catch (error: any) {
      toast.executeToast(error?.response?.data?.message, "top-center", true, {
        type: "error",
      });
    }
  };

  return (
    <>
      <DialogTitle>
        <Typography variant="h5" align="center" fontWeight="bold">
          Update Priority{" "}
          <Box component="span" sx={{ color: "error.main", ml: 1 }}>
            ({data?.ticket_id})
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div style={{ padding: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <SelectItem
                label="Priority"
                control={control}
                options={dataList}
                errors={errors}
                name="priority"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Stack>
          </form>
        </div>
      </DialogContent>
    </>
  );
}
