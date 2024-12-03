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
import { priorityList } from "../../constants/constants";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
import { updatePrioritySchema } from "../../schema/Ticket/updatePriority";

export default function TicketPriority({ data, setOpen, refetch }: any) {
  const toast = useExecuteToast();

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(updatePrioritySchema),
  });

  const onSubmit = async (formData: any) => {
    setOpen(false);
    try {
      const response = await ticketApi.updatePriority(data.id, formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      refetch();
      reset();
    } catch (error:any) {
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
                options={priorityList}
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
