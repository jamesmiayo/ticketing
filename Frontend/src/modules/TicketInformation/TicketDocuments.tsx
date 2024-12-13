import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  useTheme,
} from "@mui/material";
import { Description, AccessTime } from "@mui/icons-material";

interface Document {
  id: string;
  title: string;
  date: string;
  time: string;
}

const documents: Document[] = [
  {
    id: "1",
    title: "Project Proposal",
    date: "2023-06-15",
    time: "09:30 AM",
  },
  {
    id: "2",
    title: "Meeting Minutes",
    date: "2023-06-14",
    time: "02:45 PM",
  },
  {
    id: "3",
    title: "Budget Report",
    date: "2023-06-13",
    time: "11:15 AM",
  },
  {
    id: "4",
    title: "Client Contract",
    date: "2023-06-12",
    time: "04:00 PM",
  },
];

const TicketDocuments: React.FC = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Description />
          Ticket Documents
        </Typography>
      </Box>
      <CardContent>
        <List>
          {documents.map((doc) => (
            <ListItem
              key={doc.id}
              sx={{
                mb: 2,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: 1,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 3,
                },
              }}
            >
              <ListItemIcon>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  <Description />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {doc.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: theme.palette.text.secondary,
                      mt: 1,
                    }}
                  >
                    <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                    {`${doc.date} at ${doc.time}`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TicketDocuments;
