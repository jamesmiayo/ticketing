import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AccessTime,
  Attachment,
  Close,
  LocationOn,
  Person,
  Phone,
  Work,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ticketApi, TicketInformation } from "../../api/services/ticket";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TicketDetails = () => {
  const theme = useTheme();
  const query = useQuery();
  const ticketId = query.get("id");
  const [ticket, setTicket] = useState<TicketInformation | null>(null);

  useEffect(() => {
    const fetchTicketInformation = async () => {
      try {
        const response = await ticketApi.getInformation(ticketId);
        if (response !== undefined) {
          setTicket(response);
        }
      } catch (error) {
        console.error("Error fetching ticket information:", error);
      }
    };

    fetchTicketInformation();
  }, [ticketId]);
  return (
    <Box sx={{ width: "480px" }}>
      <Card elevation={3}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" component="h2">
              Ticket Details ({ticketId})
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <Person sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1">
                  {ticket?.requestor?.name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Work sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1">Developer</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body1">
                  {ticket?.requestor?.branch?.branch_description}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Phone sx={{ mr: 1, color: theme.palette.primary.main }} />
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
                <Chip label="IT Helpdesk" color="primary" />
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
                <Chip label="Helpdesk" color="primary" />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Box display="flex" alignItems="center" mb={2}>
            <AccessTime sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="body1">Urgent</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Person sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="body1">Assigned to: Carl</Typography>
          </Box>
          <Box mb={3}>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" gutterBottom>
              Attachments
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Attachment />}
              sx={{ textTransform: "none" }}
            >
              View Attachments
            </Button>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box display="flex">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Close />}
              size="large"
            >
              Close Ticket
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TicketDetails;
