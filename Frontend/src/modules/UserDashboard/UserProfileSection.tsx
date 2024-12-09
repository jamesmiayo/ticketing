import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  styled,
  useTheme,
  Link,
  Skeleton,
} from "@mui/material";
import { CameraAlt, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { User } from "../../api/services/user";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

export default function UserProfile() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<any>([]);

  const dashboardFetchData = async () => {
    try {
      setLoading(true);
      const result = await User.getUserProfile();
      setData(result?.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const { user } = useAuth();

  useEffect(() => {
    dashboardFetchData();
  }, []);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreview("/placeholder.svg");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    try {
      const response = await User.uploadProfile(formData);
      toast.success(response.message);

      setData((prev: any) => ({
        ...prev,
        profile_picture: response.data.path,
      }));
      await dashboardFetchData();
      handleCloseDialog();
    } catch (error: any) {
      console.error("Error uploading profile picture:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(data?.profile_picture);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledCard sx={{ mb: 4 }}>
        <CardContent sx={{ width: "100%", textAlign: "center" }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src={data?.profile_picture}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: `4px solid ${theme.palette.background.paper}`,
                boxShadow: theme.shadows[3],
              }}
            />
            <IconButton
              size="large"
              onClick={handleOpenDialog}
              sx={{
                position: "absolute",
                bottom: -10,
                right: -10,
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                boxShadow: theme.shadows[3],
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              <CameraAlt fontSize="small" />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {loading ? (
              <>
                <Skeleton variant="text" width="50%" height={30} />
                <Skeleton variant="text" width="70%" height={25} />
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton
                  variant="rectangular"
                  width="30%"
                  height={30}
                  sx={{ mt: 2 }}
                />
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  {user?.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {user?.section?.department?.division?.division_description}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {user?.section?.department?.department_description}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {user?.section?.section_description}
                </Typography>
                <Link
                  href={`mailto:${user?.email}`}
                  color="primary"
                  sx={{ mb: 2, display: "block" }}
                >
                  {user?.email}
                </Link>
              </>
            )}
          </Box>
        </CardContent>
      </StyledCard>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
            padding: theme.spacing(2),
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            paddingBottom: theme.spacing(1),
          }}
        >
          Update Profile Picture
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Avatar
            src={preview || data?.profile_picture}
            sx={{
              width: 120,
              height: 120,
              margin: "0 auto",
              border: `4px solid ${theme.palette.background.default}`,
              boxShadow: theme.shadows[3],
            }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              mt: 3,
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Choose File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Typography sx={{ mt: 2 }} color="textSecondary">
              {selectedFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            onClick={handleCloseDialog}
            startIcon={<Close />}
            sx={{ color: theme.palette.error.main }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            disabled={!selectedFile}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
