import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
import {
  Button,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import { createTicketSatisfactory } from "../../schema/Ticket/createTicketSatisfactory";

export default function TicketStatus({ data, setOpen, refetch }: any) {
  const toast = useExecuteToast();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(createTicketSatisfactory),
  });

  const onSubmit = async (formData: any) => {
    setOpen(false);
    try {
      const response = await ticketApi.createSatisfactory(data.id, formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      refetch();
      reset();
    } catch (error) {
      toast.executeToast(error?.response?.data?.message, "top-center", true, {
        type: "error",
      });
    }
  };

  const ratingTitles = [
    { name: "satisfactory_1", label: "Overall Satisfaction" },
    { name: "satisfactory_2", label: "Customer Support" },
    { name: "satisfactory_3", label: "Ease of Use" },
    { name: "satisfactory_4", label: "Features" },
    { name: "satisfactory_5", label: "Value for Money" },
  ];

  return (
    <>
      <DialogTitle>
        Before Closing {data?.title} Ticket, Please Fill Up The Satisfactory
        Form.
      </DialogTitle>
      <DialogContent>
        <div style={{ padding: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {ratingTitles.map((rating, index) => (
              <div key={index} style={{ marginBottom: 25 }}>
                <Typography
                  component="legend"
                  sx={{ fontSize: "1.25rem", fontWeight: 500 }}
                >
                  {rating.label}
                </Typography>
                <Controller
                  name={rating.name}
                  control={control}
                  render={({ field }) => (
                    <Rating
                      {...field}
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      size="large"
                    />
                  )}
                />
                {errors[rating.name] && (
                  <Typography variant="body2" color="error">
                    {errors[rating.name]?.message}
                  </Typography>
                )}
              </div>
            ))}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </DialogContent>
    </>
  );
}
