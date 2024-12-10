import React from "react";
import { Button, Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ticketApi } from "../../api/services/ticket";
import { ticketValidationSchema, ticketValidationSchemaFormtype } from "../../schema/Ticket/createTicketSchema";
import SelectItem from "../../components/common/SelectItem";
import InputComponent from "../../components/common/InputComponent";
import { useExecuteToast } from "../../context/ToastContext";
interface TicketCreationFormProps {
  onCreate: (ticket: any) => void;
  refetch?: any;
  categories: any;
  division: any;
  subcategories: any;
  handleSubCategoryList: any;
  handleCategoryList:any;
}

const statusOptions = [
  { value: "1", label: "Open" },
  { value: "7", label: "Completed" },
];

const TicketCreationForm: React.FC<TicketCreationFormProps> = ({
  onCreate,
  refetch,
  categories,
  division,
  subcategories,
  handleSubCategoryList,
  handleCategoryList,
}) => {
  const toast = useExecuteToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ticketValidationSchemaFormtype>({
    resolver: yupResolver(ticketValidationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await ticketApi.createTicket(data);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      onCreate(data);
      refetch();
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 1,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputComponent
              name="title"
              label="Ticket Title"
              register={register}
              errors={errors}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <InputComponent
              name="concern"
              label="Concern"
              register={register}
              errors={errors}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <SelectItem
              label="Division"
              control={control}
              options={division}
              errors={errors}
              name="division_id"
              onChange={(e:any) => handleCategoryList(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <SelectItem
              label="Category"
              control={control}
              options={categories}
              name="category"
              errors={errors}
              fullWidth
              onChange={(e: any) => handleSubCategoryList(e)}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectItem
              label="Sub Category"
              control={control}
              options={subcategories}
              errors={errors}
              name="subcategory_id"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <SelectItem
              label="Status"
              control={control}
              options={statusOptions}
              errors={errors}
              name="status"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Ticket
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TicketCreationForm;
