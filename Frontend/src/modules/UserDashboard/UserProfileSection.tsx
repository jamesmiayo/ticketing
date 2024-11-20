"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
  styled,
} from "@mui/material";
import {
  Key,
  Laptop,
  Person,
  Settings,
  Work,
  Security,
  Help,
  Language,
  AccountCircle,
  Edit,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { OverviewAPI } from "../../api/services/getOverview";
import TicketList from "../Ticketing/TicketList";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const ActionLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [totalTicket, setTotalTicket] = useState<any>([]);

  const dashboardFetchData = async () => {
    try {
      setLoading(true);
      const result = await OverviewAPI.getAllData();
      if (result) {
        setTotalTicket(result);
      } else {
        console.warn("Unexpected data structure:", result);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(totalTicket);

  useEffect(() => {
    dashboardFetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledCard sx={{ mb: 4 }}>
        <CardContent sx={{ width: "100%", textAlign: "center" }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src="/placeholder.svg"
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                bottom: 16,
                right: 0,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="h5" gutterBottom>
            Dastine Jhay Bernardo
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Application Developer
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            IT Group
          </Typography>
          <Link
            href="mailto:djbernardo@safc.com.ph"
            color="primary"
            sx={{ mb: 2, display: "block" }}
          >
            djbernardo@safc.com.ph
          </Link>
        </CardContent>
      </StyledCard>
      <TicketList
        ticketList={totalTicket?.total_ticket_count}
        isLoading={loading}
      />
    </Container>
  );
}
