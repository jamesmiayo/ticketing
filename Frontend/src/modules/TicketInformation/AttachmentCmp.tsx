import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  styled,
  Button,
} from "@mui/material";
import { CloudUpload, Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { ticketApi } from "../../api/services/ticket";

interface FileWithPreview extends File {
  preview: string;
}

const DropzoneArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
  border: `2px dashed ${theme.palette.divider}`,
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const schema = yup.object().shape({
  files: yup
    .array()
    .min(1, "At least one file is required")
    .required("Please upload at least one file"),
  message: yup.string().optional(),
});

export default function AttachmentCmp({
  ticket_id,
  refetch,
  closeDialog,
}: any) {
  const [filePreviews, setFilePreviews] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      files: [],
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFilePreviews((prev) => [...prev, ...fileArray]);
      setValue("files", [...filePreviews, ...fileArray], {
        shouldValidate: true,
      });
    }
  };

  const removeFile = (file: FileWithPreview) => {
    const updatedFiles = filePreviews.filter((f) => f !== file);
    setFilePreviews(updatedFiles);
    setValue("files", updatedFiles, { shouldValidate: true });
  };

  const onSubmit = async (data: any) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      data.files.forEach((file: FileWithPreview) => {
        formData.append("attachments", file);
      });
      formData.append("message", data.message);
      formData.append("ticket_id", ticket_id);
      await ticketApi.uploadAttachment(ticket_id, formData);
      refetch();
      toast.success("Files uploaded successfully!");
      closeDialog();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Files upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <Box mb={2}>
              <Typography variant="body1">Message</Typography>
              <input
                {...field}
                type="text"
                placeholder="Enter a message"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              {errors.message && (
                <Typography color="error" variant="body2">
                  {errors.message.message}
                </Typography>
              )}
            </Box>
          )}
        />

        <Controller
          name="files"
          control={control}
          render={() => (
            <DropzoneArea>
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                id="file-input"
                onChange={(e) => handleFileChange(e.target.files)}
              />
              <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                <CloudUpload
                  sx={{ fontSize: 48, mb: 2, color: "text.secondary" }}
                />
                <Typography variant="body1">Click to select files</Typography>
              </label>
            </DropzoneArea>
          )}
        />
        {errors.files && (
          <Typography color="error" variant="body2">
            {errors.files.message}
          </Typography>
        )}

        {filePreviews.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Uploaded Files:
            </Typography>
            <List>
              {filePreviews.map((file) => (
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Files"}
        </Button>
      </form>
    </Box>
  );
}
