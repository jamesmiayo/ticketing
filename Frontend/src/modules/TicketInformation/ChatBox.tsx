"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
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

export default function ChatBox({ ticketDetail }: any) {
  const { user } = useAuth()
  const toast = useExecuteToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TicketMessage>({
    resolver: yupResolver(messageValidationSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = { ticket_id: ticketDetail?.id, message: data.message };
    try {
      const response = await ticketApi.createMessage(formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

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
        <Paper elevation={3} sx={{ flex: 1, mb: 2, overflow: "auto", p: 2 }}>
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
            {ticketDetail?.ticket_messages.map((message: any) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent:
                    message.user.id === user?.id ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    bgcolor:
                    message.user.id === user?.id
                        ? "primary.light"
                        : "background.paper",
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      minWidth: 0,
                      mr: message.user.id === user?.id ? 0 : 2,
                      ml: message.user.id === user?.id ? 2 : 0,
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
                </Paper>
              </ListItem>
            ))}
          </List>
        </Paper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: "flex" }}>
              <InputComponent
                name="message"
                register={register}
                errors={errors}
                fullWidth
                variant="outlined"
                placeholder="Type a message"
                sx={{ mr: 1 }}
              />
              <Button color="primary" type="submit" aria-label="send message">
                <SendIcon />
              </Button>
            </Box>
          </Paper>
        </form>
      </Container>
    </Box>
  );
}
