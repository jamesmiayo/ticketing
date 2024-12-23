import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../../components/common/InputComponent";
import {
  createAnnouncement,
  createAnnouncementFormtype,
} from "../../schema/Announcement/createAnnouncement";
import { Announcement } from "../../api/services/announcement";
import { useExecuteToast } from "../../context/ToastContext";

export default function AnnouncementForm({ setOpen, refetch , defaultValue }: any) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const toast = useExecuteToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<createAnnouncementFormtype>({
    resolver: yupResolver(createAnnouncement),
  });

  const onSubmit = async (formData: any) => {
    const data = new FormData();
    data.append("title", formData.title); 
    data.append("description", formData.description);

    if (file) {
      data.append("file", file);
    }
    try {
      setLoading(true);
      let response;
      if(defaultValue === null){
        response = await Announcement.createAnnouncement(data);
      }else{
        response = await Announcement.updateAnnouncement(data , defaultValue.id);
      }
      toast.executeToast(response.message, "top-center", true, {
        type: "success",
      });
      refetch();
      reset();
      setFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Error creating announcement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      title: defaultValue?.title || "",
      description: defaultValue?.description || "",
    }); 
  }, [defaultValue, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <DialogTitle>{defaultValue === null ? 'Create' : 'Edit'} Announcement</DialogTitle>
      <DialogContent>
        <form style={{ marginTop: 10 }} onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <InputComponent
              name="title"
              label="Title"
              register={register}
              errors={errors}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <InputComponent
              name="description"
              label="Description"
              register={register}
              errors={errors}
              multiline
              rows={5}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <TextField
              sx={{ width: "100%" }}
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: "application/pdf,image/*" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </>
  );
}
