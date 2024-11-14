import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
} from "@mui/icons-material";

const UserProfileSection = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Card elevation={3}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    alt="User Avatar"
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                  <Typography variant="h5" gutterBottom>
                    Dastine
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Software Developer
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{ mt: 2 }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "medium" }}
                  >
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <EmailIcon
                          sx={{ mr: 1, color: theme.palette.primary.main }}
                        />
                        <Typography variant="body1">ex.gmail.com</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <PhoneIcon
                          sx={{ mr: 1, color: theme.palette.primary.main }}
                        />
                        <Typography variant="body1">09405915629</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <LocationIcon
                          sx={{ mr: 1, color: theme.palette.primary.main }}
                        />
                        <Typography variant="body1">Head Office</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <WorkIcon
                          sx={{ mr: 1, color: theme.palette.primary.main }}
                        />
                        <Typography variant="body1">
                          System And Application Department
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 3 }} />
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "medium", my: 3 }}
                  >
                    Tickets
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ gap: "10px" }}
                        mb={2}
                      >
                        <Typography variant="body1">Total</Typography>
                        <Chip
                          label="30"
                          color="primary"
                          sx={{ borderRadius: "16px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ gap: "10px" }}
                        mb={2}
                      >
                        <Typography variant="body1">Ongoing</Typography>
                        <Chip
                          label="10"
                          color="secondary"
                          sx={{ borderRadius: "16px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ gap: "10px" }}
                        mb={2}
                      >
                        <Typography variant="body1">Close</Typography>
                        <Chip
                          label="10"
                          color="success"
                          sx={{ borderRadius: "16px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ gap: "10px" }}
                        mb={2}
                      >
                        <Typography variant="body1">Pending</Typography>
                        <Chip
                          label="10"
                          color="error"
                          sx={{ borderRadius: "16px" }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default UserProfileSection;
