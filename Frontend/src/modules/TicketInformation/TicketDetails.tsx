import React, { useContext, useState } from "react";
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
  AccessTime,
  LocationOn,
  Person,
  Work,
  Flag,
  CheckCircle,
  ChangeCircle,
} from "@mui/icons-material";
import TicketStatus from "../Ticketing/TicketStatus";
import TicketAssignee from "../Ticketing/TicketAssignee";
import TicketPriority from "../Ticketing/TicketPriority";
import TicketChangeStatus from "../Ticketing/TicketChangeStatus";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { changeTicketStatus, changeTicketStatusFormtype } from "../../schema/Ticket/changeTicketStatus";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider";

interface TicketDetailsProps {
  ticketDetail: {
    title: any;
    b_status: string;
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
    ticket_priority: string;
    ticket_logs_latest?: {
      status: string;
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
  const theme = useTheme();

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
      onClick: () => handleAssigneClick("done"),
      icon: <Person />,
    },
    {
      label: "Change Status",
      onClick: () => handleAssigneClick("status"),
      icon: <ChangeCircle />,
    },
  ];

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<any>();
  function handleAssigneClick(value: any) {
    setModal(value);
    setOpen(true);
  }
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {modal === "priority" ? (
          <TicketPriority data={ticketDetail} setOpen={setOpen} />
        ) : modal === "done" ? (
          <TicketStatus data={ticketDetail} setOpen={setOpen} />
        )  : modal === "status" ? (
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
                  <AccessTime />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Priority
                  </Typography>
                  <Typography variant="body1">
                    {ticketDetail?.ticket_priority || "N/A"}
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

                {/* <Box mb={3}>
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
              </Box> */}
              </>
            )}
            {ticketDetail?.b_status !== "7" && (
              <>
                <Divider sx={{ my: 3 }} />
                {tools.map((items, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={items.icon}
                    onClick={items.onClick}
                    sx={{
                      mb: 2,
                      borderRadius: "8px",
                      padding: "10px 16px",
                      textTransform: "none",
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        "& .MuiSvgIcon-root": {
                          color: theme.palette.common.white,
                        },
                      },
                      transition: "all 0.3s ease",
                      mr: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.9rem",
                      }}
                    >
                      {items.label}
                    </Typography>
                  </Button>
                ))}
              </>
            )}

            {/* <Tooltip title="Assign Ticket">
            <IconButton
            // onClick={() => handleAssigneClick(params.row, "assign")}
            >
              <FaRegUserCircle />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change Priority">
            <IconButton
            // onClick={() => handleAssigneClick(params.row, "priority")}
            >
              <FaRegFlag />
            </IconButton>
          </Tooltip>
          <Tooltip title="Done This Ticket">
            <IconButton
            // onClick={() => handleAssigneClick(params.row, "status")}
            >
              <FaCheckCircle />
            </IconButton>
          </Tooltip> */}
            {/* )} */}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default TicketDetails;
