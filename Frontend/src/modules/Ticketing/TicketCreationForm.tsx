import React, { useState } from "react";
import {
  Button,
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  ListItemSecondaryAction,
  ListItemText,
  ListItem,
  List,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ticketApi } from "../../api/services/ticket";
import {
  ticketValidationSchema,
  ticketValidationSchemaFormtype,
} from "../../schema/Ticket/createTicketSchema";
import SelectItem from "../../components/common/SelectItem";
import InputComponent from "../../components/common/InputComponent";
import { useExecuteToast } from "../../context/ToastContext";
import { Attachment, Close } from "@mui/icons-material";

import AttachmentCmp from "../TicketInformation/AttachmentCmp";
interface TicketCreationFormProps {
  onCreate: (ticket: any) => void;
  refetch?: any;
  categories: any;
  division: any;
  subcategories: any;
  handleSubCategoryList: any;
  handleCategoryList: any;
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filePreviews, setFilePreviews] = useState<any>([]);
  const handleOpenClose = () => setOpen((prev) => !prev);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ticketValidationSchemaFormtype>({
    resolver: yupResolver(ticketValidationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      data?.files?.forEach((file: any) => {
        formData.append("files", file);
      });
      const response = await ticketApi.createTicket(data, formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      onCreate(data);
      refetch();
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFilePreviews((prev: any) => [...prev, ...fileArray]);
      setValue("files", [...filePreviews, ...fileArray], {
        shouldValidate: true,
      });
    }
  };

  const removeFile = (file: any) => {
    const updatedFiles = filePreviews.filter((f: any) => f !== file);
    setFilePreviews(updatedFiles);
    setValue("files", updatedFiles, { shouldValidate: true });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 1,
      }}
    >
      <Dialog open={open} onClose={handleOpenClose}>
        <DialogTitle>
          <Typography variant="h6" align="center" fontWeight="bold">
            Upload File for Ticket
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AttachmentCmp
            ticket_id={1}
            refetch={""}
            closeDialog={handleOpenClose}
          />
        </DialogContent>
      </Dialog>
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
            <Controller
              name="files"
              control={control}
              render={() => (
                <>
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<Attachment />}
                    sx={{ width: "100%" }}
                  >
                    <input
                      type="file"
                      accept="*"
                      multiple
                      style={{ display: "none" }}
                      id="file-input"
                      onChange={(e) => handleFileChange(e.target.files)}
                    />
                    <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                      <Typography variant="body1" sx={{ fontSize: "15px" }}>
                        Click to select files
                      </Typography>
                    </label>
                  </Button>
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectItem
              label="Division"
              control={control}
              options={division}
              errors={errors}
              name="division_id"
              onChange={(e: any) => handleCategoryList(e)}
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
          <Grid item xs={12}>
            {filePreviews.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="h6" sx={{ fontSize: "15px" }} gutterBottom>
                  Uploaded Files:
                </Typography>
                <List>
                  {filePreviews.map((file: any) => (
                    <ListItem key={file.name} divider>
                      <Box
                        component="img"
                        src={file.preview}
                        alt={file.name}
                        sx={{
                          width: 40,
                          height: 40,
                          mr: 2,
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                      <ListItemText
                        primary={file.name}
                        primaryTypographyProps={{ noWrap: true }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeFile(file)}
                        >
                          <Close />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={loading ? true : false} fullWidth>
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TicketCreationForm;
