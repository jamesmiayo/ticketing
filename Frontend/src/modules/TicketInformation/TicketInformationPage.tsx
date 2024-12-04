import { Box, Container, Typography } from "@mui/material";
import ChatBox from "./ChatBox";
import TicketDetails from "./TicketDetails";
import TicketSideBar from "../Ticketing/TicketSideBar";
import { ticketApi } from "../../api/services/ticket";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TicketLog from "./TicketLog";
import TicketAnalysis from "./TicketAnalysis";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TicketInformationPage = () => {
  const query = useQuery();
  const ticketId = query.get("id");
  const [ticket, setTicket] = useState<any | null>(null);
  const [activeSection, setActiveSection] = useState<string>("Ticket");
  const [isLoading, setIsLoading] = useState(false);
  const fetchTicketInformation = async () => {
    setIsLoading(true);
    try {
      const response = await ticketApi.getInformation(ticketId);
      if (response !== undefined) {
        setTicket(response);
      }
    } catch (error) {
      console.error("Error fetching ticket information:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTicketInformation();
  }, [ticketId]);

  return (
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
          <TicketSideBar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <Box sx={{ flex: 1, paddingLeft: 2 }}>
            {activeSection === "Ticket" && (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <ChatBox ticketDetail={ticket} />
                <TicketDetails ticketDetail={ticket} isLoading={isLoading} />
              </Box>
            )}
            {activeSection === "Analysis" && <TicketAnalysis data={ticket} />}
            {activeSection === "Costs" && (
              <Typography variant="h6">Costs Section</Typography>
            )}
            {activeSection === "Logs" && (
              <>
                <TicketLog data={ticket} />
              </>
            )}
            {activeSection === "All" && "All"}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default TicketInformationPage;
