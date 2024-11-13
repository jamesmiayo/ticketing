import React, { useEffect, useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ticketApi } from "../../api/services/ticket";
import { ticketValidationSchema } from "../../schema/Ticket/createTicketSchema";
import SelectItem from "../../components/common/SelectItem";
import { getCategoryAPI } from "../../api/services/getCategoryList";
import InputComponent from "../../components/common/InputComponent";
import { useExecuteToast } from "../../context/ToastContext";
interface TicketCreationFormProps {
  onCreate: (ticket: any) => void;
  refetch: any;
}

interface TicketFormInputs {
  title: string;
  concern: string;
  category: string;
  subcategory_id: string;
  status: string;
}

const statusOptions = [
  { value: "0", label: "Open" },
  { value: "6", label: "Completed" },
];

const TicketCreationForm: React.FC<TicketCreationFormProps> = ({
  onCreate,
  refetch,
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubCategories] = useState<any[]>([]);
  const toast = useExecuteToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TicketFormInputs>({
    resolver: yupResolver(ticketValidationSchema),
  });

  const getCategoryList = async () => {
    try {
      const response = await getCategoryAPI.getAllData();
      const data = response.map((row: any) => {
        return {
          value: row.id,
          label: row.category_description,
          sub_category: row.sub_category,
        };
      });
      setCategories(data);
    } catch (error) {
      console.error("Error fetching category list:", error);
      throw error;
    }
  };

  function handleSubCategoryList(e: any) {
    const data = categories
      .find((category: any) => category.value == e)
      ?.sub_category.map((row: any) => {
        return { value: row.id, label: row.subcategory_description };
      });
    setSubCategories(data);
  }

  useEffect(() => {
    getCategoryList();
  }, []);

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
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputComponent
              name="title"
              label="Ticket Title"
              register={register}
              errors={errors}
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
            />
          </Grid>
          <Grid container paddingTop={2} spacing={2}>
            <Grid item xs={6}>
              <SelectItem
                xs={{ marginBottom: 2 }}
                label="Category"
                control={control}
                options={categories}
                name="category"
                errors={errors}
                onChange={(e: any) => handleSubCategoryList(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectItem
                label="Sub Category"
                control={control}
                options={subcategories}
                errors={errors}
                name="subcategory_id"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <SelectItem
              label="Status"
              control={control}
              options={statusOptions}
              errors={errors}
              name="status"
            />
          </Grid>

          <Grid item xs={12}>
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
