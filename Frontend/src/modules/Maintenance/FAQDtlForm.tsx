import React, { useState, useEffect } from "react";
import { Button, Box, Grid, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "../../components/common/InputComponent";
import { useExecuteToast } from "../../context/ToastContext";
import SelectItem from "../../components/common/SelectItem";
import { FAQ } from "../../api/services/FAQ";
import { faq_dtl, faq_dtlFormtype } from "../../schema/FAQ/faq";

interface Props {
  refetch: () => void;
  onClose: () => void;
  defaultValues?: any;
}

const FAQDtlForm: React.FC<Props> = ({ refetch, onClose, defaultValues }) => {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const toast = useExecuteToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<faq_dtlFormtype>({
    resolver: yupResolver(faq_dtl),
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        FAQ_ID: defaultValues.data_id,
        title: defaultValues.label,
        body: defaultValues.body,
      });
    }
  }, [defaultValues, reset]);

  const getDataList = async () => {
    try {
      setLoading(true);
      const response = await FAQ.getFAQ();
      const dataOption = response.map((row: any) => {
        return { value: row.FAQ_ID, label: row.description };
      });
      setDataList(dataOption);
    } catch (error) {
      console.error("Error fetching FAQ HDR list:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (defaultValues) {
        const response = await FAQ.updateFAQDTL({
          id: defaultValues.id,
          body: data,
        });
        toast.executeToast(response.message, "top-center", true, {
          type: "success",
        });
      } else {
        const response = await FAQ.newFAQDTL(data);
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
              {/* <InputComponent
                name="subcategory_id"
                label="Section ID"
                register={register}
                errors={errors}
                fullWidth
                disabled={true}
              /> */}
            </Grid>
          )}
          <Grid item xs={12}>
            <SelectItem
              label="FAQ ID"
              control={control}
              options={dataList}
              errors={errors}
              name="FAQ_ID"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              name="title"
              label="Title"
              register={register}
              errors={errors}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputComponent
              name="body"
              label="Body"
              register={register}
              errors={errors}
              multiline={true}
              rows={4}
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

export default FAQDtlForm;
