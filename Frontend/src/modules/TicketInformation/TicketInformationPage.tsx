import { Box, Container, Typography } from "@mui/material";
import ChatBox from "./ChatBox";
import TicketDetails from "./TicketDetails";
import TicketSideBar from "../Ticketing/TicketSideBar";
import { ticketApi, TicketInformation } from "../../api/services/ticket";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const TicketInformationPage = () => {
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
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: "80vh",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Ticket Information
          </Typography>
          <Container
            sx={{
              display: "flex",
              height: "80vh",
              justifyContent: "center",
            }}
          >
            <TicketSideBar />
            <ChatBox ticketDetail={ticket}/>
            <TicketDetails ticketDetail={ticket}/>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default TicketInformationPage;

