import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  Skeleton,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useExecuteToast } from "../../context/ToastContext";
import { useForm } from "react-hook-form";
import { ticketApi } from "../../api/services/ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageValidationSchema } from "../../schema/Ticket/createMessage";
import InputComponent from "../../components/common/InputComponent";
import { useAuth } from "../../context/AuthContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
}

interface TicketMessage {
  ticket_id: string;
  message: string;
}

export default function ChatBox({ ticketDetail, setTicketDetail }: any) {
  const { user } = useAuth();
  const toast = useExecuteToast();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TicketMessage>({
    resolver: yupResolver(messageValidationSchema),
  });

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchMessages = async () => {
    try {
      const updatedTicketDetail = await ticketApi.getTicketDetail(
        ticketDetail.id
      );
      if (updatedTicketDetail) {
        setTicketDetail(updatedTicketDetail);
        scrollToBottom();
      } else {
        console.warn("No updated ticket detail returned");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      scrollToBottom();
    }, 1000);
  }, [ticketDetail]);

  useEffect(() => {
    if (user) {
      setUserLoaded(true);
    }
  }, [user]);

  const onSubmit = async (data: any) => {
    setSending(true);
    const formData = { ticket_id: ticketDetail?.id, message: data.message };
    try {
      const response = await ticketApi.createMessage(formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      reset();
      await fetchMessages();
      scrollToBottom();
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setSending(false);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          width: "700px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            mb: 2,
            overflow: "auto",
            p: 2,
            maxHeight: "800px",
          }}
        >
          {!userLoaded || loading ? (
            <List>
              {Array.from(new Array(10)).map((_, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{
                      mr: index % 2 === 0 ? 2 : 0,
                      ml: index % 2 !== 0 ? 2 : 0,
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={40}
                    width="60%"
                    sx={{ borderRadius: 1 }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <List>
              <Paper
                elevation={3}
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f5f5f5",
                  padding: 2,
                  zIndex: 100,
                  marginBottom: 2,
                  borderRadius: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                  }}
                >
                  {ticketDetail?.body}
                </Typography>
              </Paper>
              {ticketDetail?.ticket_messages?.map((message: any) => (
                <ListItem
                  key={message.id}
                  sx={{
                    justifyContent:
                      message.user?.id === user?.id ? "flex-end" : "flex-start",
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: "70%",
                      bgcolor:
                        message.user?.id === user?.id
                          ? "primary.light"
                          : "background.paper",
                      alignSelf:
                        message.user?.id === user?.id
                          ? "flex-end"
                          : "flex-start",
                      borderRadius: 2,
                      ml: message.user?.id === user?.id ? "auto" : 0,
                      mr: message.user?.id === user?.id ? 0 : "auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListItemText
                        primary={message.message}
                        sx={{
                          "& .MuiListItemText-primary": {
                            color:
                              message.sender === "user"
                                ? "primary.contrastText"
                                : "text.primary",
                          },
                        }}
                      />
                    </Box>
                  </Paper>
                  <ListItemAvatar
                    sx={{
                      minWidth: 0,
                      mr: message.user?.id === user?.id ? 0 : 2,
                      ml: message.user?.id === user?.id ? 2 : 0,
                    }}
                  >
                    <Tooltip title={message.user.name}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor:
                            message.sender === "user"
                              ? "primary.main"
                              : "secondary.main",
                        }}
                      >
                        {message.user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  </ListItemAvatar>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          )}
        </Paper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InputComponent
                name="message"
                register={register}
                errors={errors}
                fullWidth
                variant="outlined"
                placeholder="Type a message"
                sx={{ mr: 1 }}
              />
              <Button
                color="primary"
                type="submit"
                aria-label="send message"
                disabled={sending}
              >
                {sending ? <CircularProgress size={24} /> : <SendIcon />}
              </Button>
            </Box>
          </Paper>
        </form>
      </Container>
    </Box>
  );
}
