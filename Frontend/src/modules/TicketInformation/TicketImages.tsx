import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { Description, AccessTime } from "@mui/icons-material";

interface Document {
  id: string;
  title: string;
  date: string;
  time: string;
  imageUrl: string;
}

const documents: Document[] = [
  {
    id: "1",
    title: "Project Proposal",
    date: "2023-06-15",
    time: "09:30 AM",
    imageUrl: "https://source.unsplash.com/random/800x600?document",
  },
  {
    id: "2",
    title: "Meeting Minutes",
    date: "2023-06-14",
    time: "02:45 PM",
    imageUrl: "https://source.unsplash.com/random/800x600?meeting",
  },
  {
    id: "3",
    title: "Budget Report",
    date: "2023-06-13",
    time: "11:15 AM",
    imageUrl: "url",
  },
  {
    id: "4",
    title: "Client Contract",
    date: "2023-06-12",
    time: "04:00 PM",
    imageUrl: "url",
  },
  {
    id: "5",
    title: "Product Design",
    date: "2023-06-11",
    time: "10:00 AM",
    imageUrl: "url",
  },
  {
    id: "6",
    title: "Marketing Plan",
    date: "2023-06-10",
    time: "03:30 PM",
    imageUrl: "url",
  },
];

const TicketImages: React.FC = () => {
  return (
    <Card sx={{ margin: "auto" }}>
      <Box
        sx={{ bgcolor: "primary.main", color: "primary.contrastText", p: 2 }}
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
          Ticket Images
        </Typography>
      </Box>
      <CardContent>
        <Grid container spacing={2}>
          {documents.map((doc) => (
            <Grid item xs={6} sm={4} key={doc.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  onClick={() => window.open(doc.imageUrl, "_blank")}
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={doc.imageUrl}
                    alt={doc.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box sx={{ p: 1, flexGrow: 1 }}>
                    <Typography variant="subtitle1" component="div" noWrap>
                      {doc.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.5,
                        fontSize: "0.75rem",
                      }}
                    >
                      <AccessTime fontSize="small" />
                      {`${doc.date} ${doc.time}`}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TicketImages;
