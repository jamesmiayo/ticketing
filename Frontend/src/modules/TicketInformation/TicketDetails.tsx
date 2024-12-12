import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  Skeleton,
  Button,
  Dialog,
  Avatar,
  Paper,
} from "@mui/material";
import {
  LocationOn,
  Person,
  Work,
  Flag,
  CheckCircle,
  ChangeCircle,
} from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { IoTicket } from "react-icons/io5";
import TicketAssignee from "../Ticketing/TicketAssignee";
import TicketPriority from "../Ticketing/TicketPriority";
import TicketChangeStatus from "../Ticketing/TicketChangeStatus";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";

interface TicketDetailsProps {
  ticketDetail: {
    title: any;
    b_status: string;
    id: any;
    ticket_id?: string;
    requestor?: {
      phone_number?: string;
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
    ticket_priority: string;
    ticket_logs_latest?: {
      assignee?: {
        name?: string;
      };
      ticket_status: string;
    };
  };
  isLoading: boolean;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  ticketDetail,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<any>();
  const toast = useExecuteToast();

  const tools = [
    {
      label: "Assign Ticket",
      onClick: () => handleAssigneClick("assignee"),
      icon: <Person />,
    },
    {
      label: "Change Priority",
      onClick: () => handleAssigneClick("priority"),
      icon: <Flag />,
    },
    {
      label: "Done This Ticket",
      onClick: () => handleTicketForValidation(),
      icon: <CheckCircle />,
    },
    {
      label: "Change Status",
      onClick: () => handleAssigneClick("status"),
      icon: <ChangeCircle />,
    },
  ];

  function handleAssigneClick(value: any) {
    setModal(value);
    setOpen(true);
  }

  const handleTicketForValidation = async () => {
    try {
      const response = await ticketApi.changeStatusTicket(ticketDetail.id, {
        status: 7,
      });
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        height={605}
        width="100%"
        sx={{ borderRadius: 2 }}
      />
    );
  }
  console.log(ticketDetail);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {modal === "priority" ? (
          <TicketPriority data={ticketDetail} setOpen={setOpen} />
        ) : modal === "status" ? (
          <TicketChangeStatus data={ticketDetail} setOpen={setOpen} />
        ) : (
          <TicketAssignee data={ticketDetail} setOpen={setOpen} />
        )}
      </Dialog>

      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{ bgcolor: "primary.main", color: "primary.contrastText", p: 2 }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <IoTicket size={24} />
            Ticket Details
          </Typography>

          <Typography variant="subtitle1">
            {ticketDetail?.ticket_id || "N/A"}
          </Typography>
        </Box>
        <CardContent>
          <Paper
            elevation={0}
            sx={{ p: 2, mb: 2, bgcolor: "background.default" }}
          >
            <Typography variant="h6" gutterBottom>
              {ticketDetail?.title}
            </Typography>
            <Chip
              label={ticketDetail?.ticket_priority || "N/A"}
              color="primary"
              size="small"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                marginRight: 1,
              }}
            />
            <Chip
              label={ticketDetail?.ticket_logs_latest?.ticket_status}
              color="primary"
              size="small"
              sx={{ textTransform: "uppercase", fontWeight: "bold" }}
            />
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Requestor
                  </Typography>
                  <Typography variant="body1">
                    {ticketDetail?.requestor?.name || "No Name"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <Work />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Department
                  </Typography>
                  <Typography variant="body1">
                    {ticketDetail?.requestor?.section?.department
                      ?.department_description || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <LocationOn />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Branch
                  </Typography>
                  <Typography variant="body1">
                    {ticketDetail?.requestor?.branch?.branch_description ||
                      "No Branch"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <LocalPhoneIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Viber Number
                  </Typography>
                  <Typography variant="body1">
                    {ticketDetail?.requestor?.phone_number || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Additional Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Division
                </Typography>
                <Chip
                  label={
                    ticketDetail?.requestor?.section?.department
                      ?.department_description || "No Department"
                  }
                  color="primary"
                  size="small"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Department
                </Typography>
                <Chip
                  label={
                    ticketDetail?.requestor?.section?.department
                      ?.department_description || "No Department"
                  }
                  color="primary"
                  size="small"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Section
                </Typography>
                <Chip
                  label={
                    ticketDetail?.requestor?.section?.section_description ||
                    "No Section"
                  }
                  color="primary"
                  size="small"
                />
              </Paper>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Typography variant="subtitle2" color="textSecondary">
              Assigned to
            </Typography>
            <Typography variant="body1">
              {ticketDetail?.ticket_logs_latest?.assignee?.name || "None"}
            </Typography>
          </Box>

          {ticketDetail?.b_status !== "7" && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
              <Grid container spacing={2}>
                {tools.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Button
                      variant="outlined"
                      startIcon={item.icon}
                      onClick={item.onClick}
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        p: 1.5,
                        justifyContent: "flex-start",
                        borderColor: "primary.main",
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "primary.contrastText",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TicketDetails;
