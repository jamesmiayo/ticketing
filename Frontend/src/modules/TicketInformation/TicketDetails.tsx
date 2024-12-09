import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  useTheme,
  Skeleton,
  Button,
  Dialog,
} from "@mui/material";
import {
  AccessTime,
  LocationOn,
  Person,
  Phone,
  Work,
} from "@mui/icons-material";
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
    };
  };
  isLoading: boolean;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  ticketDetail,
  isLoading,
}) => {
  const { permission } = useContext(PermissionContext);
  const theme = useTheme();
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
      icon: <Person />,
    },
    {
      label: "Done This Ticket",
      onClick: () => onSubmit(),
      icon: <Person />,
    },
    {
      label: "Change Status",
      onClick: () => handleAssigneClick("status"),
      icon: <Person />,
    },
  ];

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<any>();

  function handleAssigneClick(value: any) {
    setModal(value);
    setOpen(true);
  }
  
  const onSubmit = async () => {
    try {
      const response = await ticketApi.changeStatusTicket(ticketDetail.id, {status: '7'});
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
    } catch (error: any) {
      toast.executeToast(error?.response?.data?.message, "top-center", true, {
        type: "error",
      });
    }
  };

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
                      <Person
                        sx={{ mr: 1, color: theme.palette.primary.main }}
                      />
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
                      <Phone
                        sx={{ mr: 1, color: theme.palette.primary.main }}
                      />
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
                          ticketDetail?.requestor?.section
                            ?.section_description || "No Section"
                        }
                        color="primary"
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" alignItems="center" mb={2}>
                  <AccessTime
                    sx={{ mr: 1, color: theme.palette.primary.main }}
                  />
                  <Typography variant="body1">
                    {ticketDetail?.ticket_priority || "N/A"}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Person sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="body1">
                    Assigned to:{" "}
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
          {(ticketDetail?.ticket_logs_latest?.status != "7" || permission.includes('Can Modify Ticket')) && (
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
