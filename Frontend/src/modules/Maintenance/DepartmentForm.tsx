import React, { useState, useEffect } from "react";
import { Button, Box, Grid, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "../../components/common/InputComponent";
import { useExecuteToast } from "../../context/ToastContext";
import {
  department,
  departmentFormtype,
} from "../../schema/department/department";
import { Department } from "../../api/services/department";
import SelectItem from "../../components/common/SelectItem";
import { Division } from "../../api/services/division";

interface Props {
  refetch: () => void;
  onClose: () => void;
  defaultValues?: any;
}

const DepartmentForm: React.FC<Props> = ({
  refetch,
  onClose,
  defaultValues,
}) => {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const toast = useExecuteToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<departmentFormtype>({
    resolver: yupResolver(department),
  });

  //get division
  const getDataList = async () => {
    try {
      setLoading(true);
      const response = await Division.getDivision();
      const dataOption = response.map((row: any) => {
        return { value: row.id, label: row.division_description };
      });
      setDataList(dataOption);
    } catch (error) {
      console.error("Error fetching category list:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  useEffect(() => {
    if (defaultValues) {
      reset({
        department_description: defaultValues.label,
        department_id: defaultValues.data_id,
        division_id: defaultValues.division_id,
        b_active: defaultValues.active,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (defaultValues) {
        const response = await Department.updateDepartment({
          id: defaultValues.id,
          body: data,
        });
        toast.executeToast(response.message, "top-center", true, {
          type: "success",
        });
      } else {
        const response = await Department.newDepartment(data);
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
                name="department_id"
                label="Department ID"
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
              options={dataList}
              errors={errors}
              name="division_id"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              name="department_description"
              label="Department"
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

export default DepartmentForm;
