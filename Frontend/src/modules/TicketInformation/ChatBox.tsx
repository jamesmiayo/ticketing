"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "other" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
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
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    bgcolor:
                      message.sender === "user"
                        ? "primary.light"
                        : "background.paper",
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      minWidth: 0,
                      mr: message.sender === "user" ? 0 : 2,
                      ml: message.sender === "user" ? 2 : 0,
                    }}
                  >
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
                      {message.sender === "user" ? "U" : "O"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={message.text}
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
            <div ref={messagesEndRef} />
          </List>
        </Paper>
        <Paper
          component="form"
          onSubmit={handleSendMessage}
          elevation={3}
          sx={{ p: 2 }}
        >
          <Box sx={{ display: "flex" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{ mr: 1 }}
            />
            <IconButton color="primary" type="submit" aria-label="send message">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
