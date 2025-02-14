import React, { useState, useEffect } from "react";
import { Button, Box, Grid, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "../../components/common/InputComponent";
import { useExecuteToast } from "../../context/ToastContext";
import { faq_hdr, faq_hdrFormtype } from "../../schema/FAQ/faq";
import { FAQ } from "../../api/services/FAQ";

interface Props {
  refetch: () => void;
  onClose: () => void;
  defaultValues?: any;
}

const FAQHdrForm: React.FC<Props> = ({ refetch, onClose, defaultValues }) => {
  const [loading, setLoading] = useState(false);
  const toast = useExecuteToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<faq_hdrFormtype>({
    resolver: yupResolver(faq_hdr),
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        description: defaultValues.label,
        FAQ_ID: defaultValues.data_id,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (defaultValues) {
        const response = await FAQ.updateFAQ({
          id: defaultValues.id,
          body: data,
        });
        toast.executeToast(response.message, "top-center", true, {
          type: "success",
        });
      } else {
        const response = await FAQ.newFAQ(data);
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
                name="FAQ_ID"
                label="FAQ ID"
                register={register}
                errors={errors}
                fullWidth
                disabled={true}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <InputComponent
              name="description"
              label="description"
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

export default FAQHdrForm;
