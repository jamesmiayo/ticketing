import React, { useState, useEffect } from "react";
import { Button, Box, Grid, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "../../components/common/InputComponent";
import { useExecuteToast } from "../../context/ToastContext";
import { category, categoryFormtype } from "../../schema/Category/category";
import { getCategoryAPI } from "../../api/services/getCategoryList";
import { Branch } from "../../api/services/branch";
import { branch, branchFormtype } from "../../schema/Branch/branch";

interface Props {
  refetch: () => void;
  onClose: () => void;
  defaultValues?: any;
}

const BranchForm: React.FC<Props> = ({ refetch, onClose, defaultValues }) => {
  const [loading, setLoading] = useState(false);
  const toast = useExecuteToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<branchFormtype>({
    resolver: yupResolver(branch),
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        branch_description: defaultValues.label,
        branch_id: defaultValues.data_id,
        b_active: defaultValues.active,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (defaultValues) {
        const response = await Branch.updateBranch({
          id: defaultValues.id,
          body: data,
        });
        toast.executeToast(response.message, "top-center", true, {
          type: "success",
        });
      } else {
        const response = await Branch.newBranch(data);
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
                name="branch_id"
                label="Branch ID"
                register={register}
                errors={errors}
                fullWidth
                disabled={true}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <InputComponent
              name="branch_description"
              label="Branch"
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

export default BranchForm;
