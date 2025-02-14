import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import SelectItem from "../../components/common/SelectItem";
import { statusListAssign } from "../../constants/constants";
import { useExecuteToast } from "../../context/ToastContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  changeTicketStatus,
  changeTicketStatusFormtype,
} from "../../schema/Ticket/changeTicketStatus";
import { ticketApi } from "../../api/services/ticket";

export default function TicketChangeStatus({ data, setOpen }: any) {
  const toast = useExecuteToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<changeTicketStatusFormtype>({
    resolver: yupResolver(changeTicketStatus),
  });

  const onSubmit = async (formData: any) => {
    setOpen(false);
    try {
      const response = await ticketApi.changeStatusTicket(data.id, formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      reset();
    } catch (error: any) {
      toast.executeToast(error?.response?.data?.message, "top-center", true, {
        type: "error",
      });
    }
  };

  return (
    <>
      <DialogTitle sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h5" component="span" fontWeight="bold">
          Change Status :
          <Box component="span" sx={{ color: "error.main", ml: 1 }}>
            ({data?.ticket_id})
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectItem
            label="Status"
            control={control}
            options={statusListAssign}
            errors={errors}
            name="status"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Change Status Ticket
          </Button>
        </form>
      </DialogContent>
    </>
  );
}
