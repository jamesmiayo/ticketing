import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
} from "@mui/material";
import { Attachment, Send as SendIcon } from "@mui/icons-material";
import { format } from "date-fns";
import { useExecuteToast } from "../../context/ToastContext";
import { useForm, Controller } from "react-hook-form";
import { ticketApi } from "../../api/services/ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  messageValidationSchema,
  messageValidationSchemaFormtype,
} from "../../schema/Ticket/createMessage";
import { useAuth } from "../../context/AuthContext";
import AttachmentCmp from "./AttachmentCmp";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  overflow: "hidden",
}));

const MessageBubble = styled(Paper)(
  ({ theme, isUser }: { theme: any; isUser: boolean }) => ({
    padding: theme.spacing(1.5),
    maxWidth: "30%",
    backgroundColor: isUser
      ? theme.palette.primary.light
      : theme.palette.grey[100],
    alignSelf: isUser ? "flex-end" : "flex-start",
    borderRadius: 16,
    marginLeft: isUser ? "auto" : 0,
    marginRight: isUser ? 0 : "auto",
    display: "flex",
    flexDirection: isUser ? "row-reverse" : "row",
    gap: theme.spacing(1),
  })
);

const ScrollableContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: "10px",
  },
});

export default function ChatBox({ ticketDetail }: any) {
  const { user } = useAuth();
  const toast = useExecuteToast();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => setOpen((prev) => !prev);

  const { control, handleSubmit, reset } =
    useForm<messageValidationSchemaFormtype>({
      resolver: yupResolver(messageValidationSchema),
    });

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const response = await ticketApi.getMessage({
        ticket_id: ticketDetail.id,
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [ticketDetail]);

  useEffect(() => {
    if (user) setUserLoaded(true);
  }, [user]);

  const onSubmit = async (data: any) => {
    setSending(true);
    try {
      const response = await ticketApi.createMessage({
        ticket_id: ticketDetail?.id,
        message: data.message,
      });
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      reset();
      await fetchMessage();
    } catch (error) {
      console.error("Error creating message:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleOpenClose}>
        <DialogTitle>
          <Typography variant="h6" align="center" fontWeight="bold">
            Upload File for Ticket {ticketDetail?.ticket_id}
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
      <StyledPaper
        sx={{
          height: "87vh",
          display: "flex",
          flexDirection: "column",
          // minWidth: "500px",
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6">
            Ticket: {ticketDetail?.ticket_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ticketDetail?.body}
          </Typography>
        </Box>
        <ScrollableContainer p={2}>
          {!userLoaded || loading ? (
            <></>
          ) : (
            // <List>
            //   {Array.from(new Array(5)).map((_, index) => (
            //     <ListItem
            //       key={index}
            //       sx={{
            //         justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
            //       }}
            //     >
            //       <Skeleton
            //         variant="circular"
            //         width={40}
            //         height={40}
            //         sx={{
            //           mr: index % 2 === 0 ? 2 : 0,
            //           ml: index % 2 !== 0 ? 2 : 0,
            //         }}
            //       />
            //       <Skeleton
            //         variant="rectangular"
            //         height={40}
            //         width="60%"
            //         sx={{ borderRadius: 2 }}
            //       />
            //     </ListItem>
            //   ))}
            // </List>
            <List>
              {messages.map((message: any) => (
                <Box key={message.id} sx={{ mb: 3 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align={message.user?.id === user?.id ? "right" : "left"}
                    sx={{
                      display: "block",
                      margin:
                        message.user?.id === user?.id
                          ? "0 0 4px auto"
                          : "0 auto 4px 0",
                      fontSize: "0.75rem",
                    }}
                  >
                    {format(
                      new Date(message.created_at),
                      "EEE, MMM d yyyy,  h:mm a"
                    )}
                  </Typography>
                  <ListItem sx={{ alignItems: "flex-start" }}>
                    <MessageBubble
                      isUser={message.user?.id === user?.id}
                      theme={undefined}
                    >
                      <ListItemAvatar sx={{ minWidth: 0 }}>
                        <Tooltip title={message.user.name}>
                          <Avatar
                            src={message.user.profile_picture}
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: !message.user.profile_picture
                                ? message.user?.id === user?.id
                                  ? "primary.main"
                                  : "secondary.main"
                                : "transparent",
                            }}
                          >
                            {!message.user.profile_picture &&
                              message.user.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </Tooltip>
                      </ListItemAvatar>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <ListItemText
                          primary={message.message}
                          sx={{
                            "& .MuiListItemText-primary": {
                              color:
                                message.user?.id === user?.id
                                  ? "primary.contrastText"
                                  : "text.primary",
                            },
                          }}
                        />
                      </Box>
                    </MessageBubble>
                  </ListItem>
                  {message.documents.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 1,
                        mr: 3,
                        alignItems:
                          message.user?.id === user?.id
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      {message.documents.map((document: any, index: number) => {
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
                              maxWidth: "100px",
                            }}
                          >
                            {isImage ? (
                              <img
                                src={document.file_url}
                                alt={`Document ${index}`}
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
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
                                    fontSize: "12px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "8px",
                                    padding: "12px",
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
                                    mt: 0.5,
                                  }}
                                >
                                  Document
                                </Typography>
                              </>
                            )}
                          </a>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </List>
          )}
        </ScrollableContainer>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ p: 2, borderTop: 1, borderColor: "divider" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Send File Attachment">
              <IconButton onClick={handleOpenClose} size="small">
                <Attachment />
              </IconButton>
            </Tooltip>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message"
                  size="small"
                  sx={{ mr: 1 }}
                />
              )}
            />
            <IconButton
              color="primary"
              type="submit"
              aria-label="send message"
              disabled={sending}
              size="small"
            >
              {sending ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
        </Box>
      </StyledPaper>
    </>
  );
}
