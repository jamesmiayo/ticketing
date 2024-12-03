import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { IoAlertCircleOutline } from "react-icons/io5";
import { ReactNode, useState } from "react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  selectedData: { label: string; active: boolean } | null;
  onConfirm: () => Promise<void>;
  newMessage?: string | ReactNode;
}

export function ConfirmDialog({
  open,
  onClose,
  selectedData,
  onConfirm,
  newMessage,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Error during confirmation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: 12,
          padding: 16,
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="span" fontWeight="bold">
          Confirm Action
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            color: "warning.main",
          }}
        >
          <IoAlertCircleOutline size={24} style={{ marginRight: 8 }} />
          <Typography variant="subtitle1" fontWeight="medium">
            Are you absolutely sure?
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You are about to{" "}
          {newMessage ? (
            <span>{newMessage}</span>
          ) : selectedData?.active ? (
            <span style={{ color: "red", fontWeight: "bold" }}>DEACTIVATE</span>
          ) : (
            <span style={{ color: "green", fontWeight: "bold" }}>ACTIVATE</span>
          )}{" "}
          the{" "}
          <Typography component="span" fontWeight="bold">
            {selectedData?.label}
          </Typography>
          .
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This action cannot be undone. Please confirm your choice.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", pt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 2 }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, position: "relative" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
