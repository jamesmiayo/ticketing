import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";
import {
  AccessTime,
  Attachment,
  Close,
  LocationOn,
  Person,
  Phone,
  Work,
} from "@mui/icons-material";

interface TicketDetailsProps {
  ticketDetail: {
    id: any;
    ticket_id?: string;
    requestor?: {
      name?: string;
      branch?: {
        branch_description?: string;
      };
      section?: {
        section_description?: string;
        department?: {
          department_description?: string;
        };
      };
    };
    ticket_logs_latest?: {
      assignee?: {
        name?: string;
      };
    };
  };
  isLoading: boolean;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  ticketDetail,
  isLoading,
}) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ width: "480px" }}>
      <Card elevation={3}>
        <CardContent>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height={605}
              width="100%"
              sx={{ borderRadius: 1 }}
            />
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h5" component="h2">
                  Ticket Details ({ticketDetail?.ticket_id || "N/A"})
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Person sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="body1">
                      {ticketDetail?.requestor?.name || "No Name"}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Work sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="body1">Developer</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <LocationOn
                      sx={{ mr: 1, color: theme.palette.primary.main }}
                    />
                    <Typography variant="body1">
                      {ticketDetail?.requestor?.branch?.branch_description ||
                        "No Branch"}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Phone sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="body1">09495915119</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="subtitle1"
                      gutterBottom
                    >
                      Department
                    </Typography>
                    <Chip
                      label={
                        ticketDetail?.requestor?.section?.department
                          ?.department_description || "No Department"
                      }
                      color="primary"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="subtitle1"
                      gutterBottom
                    >
                      Section
                    </Typography>
                    <Chip
                      label={
                        ticketDetail?.requestor?.section?.section_description ||
                        "No Section"
                      }
                      color="primary"
                    />
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" alignItems="center" mb={2}>
                <AccessTime sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1">{ticketDetail?.ticket_priority || 'N/A'}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Person sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1">
                  Assigned to:{" "}
                  {ticketDetail?.ticket_logs_latest?.assignee?.name || "None"}
                </Typography>
              </Box>

              <Box mb={3}>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Attachments
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Attachment />}
                  sx={{ textTransform: "none" }}
                  onClick={() => setOpen(!open)}
                >
                  Attachments
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box display="flex">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Close />}
                  size="large"
                  onClick={handleOpenClose}
                >
                  Close Ticket
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TicketDetails;
