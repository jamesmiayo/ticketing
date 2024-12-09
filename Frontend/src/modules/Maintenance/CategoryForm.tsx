import React, { useState, useEffect } from "react";
import { Button, Box, Grid, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "../../components/common/InputComponent";
import { useExecuteToast } from "../../context/ToastContext";
import { category, categoryFormtype } from "../../schema/Category/category";
import { getCategoryAPI } from "../../api/services/getCategoryList";
import { Division } from "../../api/services/division";
import SelectItem from "../../components/common/SelectItem";

interface Props {
  refetch: () => void;
  onClose: () => void;
  defaultValues?: any;
}

const CategoryForm: React.FC<Props> = ({ refetch, onClose, defaultValues }) => {
  const [loading, setLoading] = useState(false);
  const toast = useExecuteToast();
  const [division, setDivision] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<categoryFormtype>({
    resolver: yupResolver(category),
  });
  const getDivisionList = async () => {
    try {
      const response = await Division.getDivision();
      const data = response.map((row: any) => {
        return {
          value: row.id,
          label: row.division_description,
        };
      });
      setDivision(data);
    } catch (error) {
      console.error("Error fetching category list:", error);
      throw error;
    }
  };
  useEffect(() => {
    getDivisionList();
    if (defaultValues) {
      reset({
        category_description: defaultValues.label,
        category_id: defaultValues.category_id,
        b_active: defaultValues.active,
        division_id: defaultValues.division_id,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (defaultValues) {
        const response = await getCategoryAPI.updateCategory({
          id: defaultValues.id,
          body: data,
        });
        toast.executeToast(response.message, "top-center", true, {
          type: "success",
        });
      } else {
        const response = await getCategoryAPI.newCategory(data);
        toast.executeToast(response.message, "top-center", true, {
          type: "success",
        });
      }
      refetch();
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.executeToast(
        "Failed to save category. Please try again.",
        "top-center",
        true,
        { type: "error" }
      );
    } finally {
      setLoading(false);
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
          {defaultValues && (
            <Grid item xs={12}>
              <InputComponent
                name="category_id"
                label="Category ID"
                register={register}
                errors={errors}
                fullWidth
                disabled={true}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <SelectItem
              label="Division"
              control={control}
              options={division}
              errors={errors}
              name="division_id"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              name="category_description"
              label="Category"
              register={register}
              errors={errors}
              fullWidth
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
  );
};

export default CategoryForm;
