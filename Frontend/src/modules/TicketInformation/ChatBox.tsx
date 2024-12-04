import {
  useState,
  useEffect,
  useRef,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Attachment, Send as SendIcon } from "@mui/icons-material";
import { useExecuteToast } from "../../context/ToastContext";
import { useForm } from "react-hook-form";
import { ticketApi } from "../../api/services/ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  messageValidationSchema,
  messageValidationSchemaFormtype,
} from "../../schema/Ticket/createMessage";
import InputComponent from "../../components/common/InputComponent";
import { useAuth } from "../../context/AuthContext";
import AttachmentCmp from "./AttachmentCmp";

export default function ChatBox({ ticketDetail }: any) {
  const { user } = useAuth();
  const toast = useExecuteToast();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen((prev) => !prev);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<messageValidationSchemaFormtype>({
    resolver: yupResolver(messageValidationSchema),
  });

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchMessage = async () => {
    try {
      const response = await ticketApi.getMessage({
        ticket_id: ticketDetail.id,
      });
      setLoading(true);
      setMessages(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
    fetchMessage();
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
      await fetchMessage();
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleOpenClose}>
        <DialogTitle>
          <Typography variant="h5" align="center" fontWeight="bold">
            Upload File
            <Box component="span" sx={{ color: "error.main", ml: 1 }}>
              {ticketDetail?.ticket_id}
            </Box>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AttachmentCmp
            ticket_id={ticketDetail?.id}
            refetch={fetchMessage}
            closeDialog={handleOpenClose}
          />
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "87vh",
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
              maxHeight: "700px",
            }}
          >
            {!userLoaded || loading ? (
              <List>
                {Array.from(new Array(10)).map((_, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      justifyContent:
                        index % 2 === 0 ? "flex-start" : "flex-end",
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
                {messages.map((message: any) => (
                  <ListItem
                    key={message.id}
                    sx={{
                      justifyContent:
                        message.user?.id === user?.id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <Container>
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
                          display: "flex",
                          flexDirection:
                            message.user?.id === user?.id ? "row-reverse" : "",
                          gap: 2,
                        }}
                      >
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
                      {message.documents.length > 0 && (
                        <Container
                          sx={{
                            maxWidth: "70%",
                            alignSelf:
                              message.user?.id === user?.id
                                ? "flex-end"
                                : "flex-start",
                            borderRadius: 2,
                            ml: message.user?.id === user?.id ? "auto" : 0,
                            mr: message.user?.id === user?.id ? 0 : "auto",
                            display: "flex",
                            flexDirection:
                              message.user?.id === user?.id
                                ? "row-reverse"
                                : "",
                            marginTop: "20px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <List>
                              {message.documents?.map(
                                (
                                  document: {
                                    file_url:
                                      | string
                                      | number
                                      | boolean
                                      | ReactElement<
                                          any,
                                          string | JSXElementConstructor<any>
                                        >
                                      | Iterable<ReactNode>
                                      | ReactPortal
                                      | null
                                      | undefined;
                                  },
                                  index: Key | null | undefined
                                ) => (
                                  <ListItem key={index}>
                                    <a
                                      href={document.file_url as string}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ textDecoration: "none" }}
                                    >
                                      <img
                                        src={document.file_url as string}
                                        alt={`Document ${index}`}
                                        style={{
                                          maxWidth: "300px",
                                          borderRadius: "8px",
                                          boxShadow:
                                            "0px 2px 5px rgba(0,0,0,0.1)",
                                        }}
                                      />
                                    </a>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Box>
                        </Container>
                      )}
                    </Container>
                  </ListItem>
                ))}
                <div ref={messagesEndRef} />
              </List>
            )}
          </Paper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Send File Attachment">
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={() => setOpen(!open)}
                  >
                    <Attachment />
                  </Button>
                </Tooltip>
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
    </>
  );
}
