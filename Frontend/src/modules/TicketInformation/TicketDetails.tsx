import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  Skeleton,
  Button,
  Dialog,
  Avatar,
  Paper,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
} from "@mui/material";
import {
  Person,
  Work,
  Flag,
  CheckCircle,
  ChangeCircle,
  LocalPhone,
  ConfirmationNumber,
  Business,
  Assignment,
  Domain,
  AccountTree,
  Attachment,
} from "@mui/icons-material";
import TicketAssignee from "../Ticketing/TicketAssignee";
import TicketPriority from "../Ticketing/TicketPriority";
import TicketChangeStatus from "../Ticketing/TicketChangeStatus";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaFile } from "react-icons/fa";

interface TicketDetailsProps {
  ticketDetail: {
    ticket_files: any;
    title: any;
    b_status: string;
    id: any;
    ticket_id?: string;
    requestor?: {
      phone_number?: string;
      name?: string;
      position?: string;
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
    sla: {
      priority_label: string;
    };
  };
  isLoading: boolean;
  refetch: () => any;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  ticketDetail,
  isLoading,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<any>();
  const toast = useExecuteToast();
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

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {modal === "priority" ? (
          <TicketPriority
            data={ticketDetail}
            setOpen={setOpen}
            refetch={refetch}
          />
        ) : modal === "status" ? (
          <TicketChangeStatus data={ticketDetail} setOpen={setOpen} />
        ) : (
          <TicketAssignee
            data={ticketDetail}
            setOpen={setOpen}
            refetch={refetch}
          />
        )}
      </Dialog>

      <Card
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          height: "100%",
          maxHeight: "90vh",
          // width: "650px",
          margin: "0 auto",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
            >
              <ConfirmationNumber />
              Ticket Details
            </Typography>
            <Typography variant="body2">
              {ticketDetail?.ticket_id || "N/A"}
            </Typography>
          </Box>
        </Box>
        <Box>
          {ticketDetail?.ticket_files.length > 0 && (
            <Accordion slotProps={{ heading: { component: "h4" } }}>
              <AccordionSummary
                expandIcon={<FaArrowAltCircleUp />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Badge
                  badgeContent={ticketDetail?.ticket_files.length}
                  sx={{ paddingRight: 2 }}
                  color="primary"
                >
                  <FaFile color="blue" style={{ marginRight: "4px" }} /> File
                  Attached
                </Badge>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    marginLeft: 2,
                  }}
                >
                  {ticketDetail?.ticket_files.map(
                    (document: any, index: number) => {
                      const fileExtension = document.file_url
                        .split(".")
                        .pop()
                        ?.toLowerCase();
                      const isImage = ["jpeg", "png", "jpg"].includes(
                        fileExtension || ""
                      );

                      return (
                        <a
                          key={index}
                          href={document.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "120px", // Set consistent max width
                            margin: "4px", // Add spacing between items
                          }}
                        >
                          {isImage ? (
                            <img
                              src={document.file_url}
                              alt={`Document ${index}`}
                              style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "8px",
                                objectFit: "cover",
                                marginBottom: "4px",
                              }}
                            />
                          ) : (
                            <>
                              <Box
                                sx={{
                                  bgcolor: "secondary.main",
                                  color: "white",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  width: "60px",
                                  height: "60px",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    bgcolor: "secondary.dark",
                                    transform: "scale(1.1)",
                                  },
                                }}
                              >
                                <Attachment fontSize="small" />
                              </Box>
                              <Typography
                                variant="caption"
                                align="center"
                                sx={{
                                  maxWidth: "100px",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  marginTop: "4px",
                                }}
                              >
                                Document
                              </Typography>
                            </>
                          )}
                        </a>
                      );
                    }
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
        <CardContent>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: theme.palette.background.default,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {ticketDetail?.title}
            </Typography>
            <Box display="flex" gap={1} mt={2} flexWrap="wrap">
              <Chip
                icon={<Flag />}
                label={ticketDetail?.sla?.priority_label || "N/A"}
                color="primary"
                size="small"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              />
              <Chip
                icon={<Assignment />}
                label={ticketDetail?.ticket_logs_latest?.ticket_status}
                color="secondary"
                size="small"
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              />
            </Box>
          </Paper>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: "100%",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                  Ticket Information
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <InfoItem
                      icon={<Person />}
                      title="Requestor"
                      value={ticketDetail?.requestor?.name || "No Name"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem
                      icon={<Business />}
                      title="Branch"
                      value={
                        ticketDetail?.requestor?.branch?.branch_description ||
                        "No Branch"
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem
                      icon={<Work />}
                      title="Position"
                      value={ticketDetail?.requestor?.position || "N/A"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem
                      icon={<LocalPhone />}
                      title="Viber Number"
                      value={ticketDetail?.requestor?.phone_number || "N/A"}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: "100%",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                  Requestor Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <InfoItem
                      icon={<Domain />}
                      title="Division"
                      value={
                        ticketDetail?.requestor?.section?.department
                          ?.department_description || "No Division"
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem
                      icon={<Business />}
                      title="Department"
                      value={
                        ticketDetail?.requestor?.section?.department
                          ?.department_description || "No Department"
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem
                      icon={<AccountTree />}
                      title="Section"
                      value={
                        ticketDetail?.requestor?.section?.section_description ||
                        "No Section"
                      }
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          {ticketDetail?.ticket_logs_latest?.assignee?.name !== undefined && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: "100%",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                    Assign Details & Assignment
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <InfoItem
                        icon={<Person />}
                        title="Assigned to"
                        value={
                          ticketDetail?.ticket_logs_latest?.assignee?.name ||
                          "None"
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InfoItem
                        icon={<Domain />}
                        title="Division"
                        value={
                          ticketDetail?.requestor?.section?.department
                            ?.department_description || "No Division"
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InfoItem
                        icon={<Business />}
                        title="Department"
                        value={
                          ticketDetail?.requestor?.section?.department
                            ?.department_description || "No Department"
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InfoItem
                        icon={<AccountTree />}
                        title="Section"
                        value={
                          ticketDetail?.requestor?.section
                            ?.section_description || "No Section"
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InfoItem
                        icon={<Work />}
                        title="Position"
                        value={ticketDetail?.requestor?.position || "N/A"}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}

          {ticketDetail?.b_status !== "7" &&
            ticketDetail?.ticket_logs_latest?.assignee?.name !== undefined && (
              <Box mt={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
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
          {ticketDetail?.ticket_logs_latest?.assignee?.name === undefined && (
            <>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Person />}
                  onClick={() => handleAssigneClick("priority")}
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
                  Change Priority
                </Button>
              </Box>
              {ticketDetail?.sla !== null && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Person />}
                    onClick={() => handleAssigneClick("assignee")}
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
                    Assign Ticket
                  </Button>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

const InfoItem = ({ icon, title, value }: any) => (
  <Box display="flex" alignItems="center" mb={2}>
    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>{icon}</Avatar>
    <Box>
      <Typography variant="caption" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  </Box>
);

export default TicketDetails;
