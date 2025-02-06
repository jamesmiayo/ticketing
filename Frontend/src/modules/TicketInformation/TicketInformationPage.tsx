import { Box, Typography } from "@mui/material";
import ChatBox from "./ChatBox";
import TicketDetails from "./TicketDetails";
import TicketSideBar from "../Ticketing/TicketSideBar";
import { ticketApi } from "../../api/services/ticket";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TicketLog from "./TicketLog";
import TicketAnalysis from "./TicketAnalysis";
import TicketRemarks from "./TicketRemarks";
import TicketDocuments from "./TicketDocuments";
import TicketImages from "./TicketImages";

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
          p: 3,
          minHeight: "80vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Ticket Information
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "20px",
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
                  gap: 2,
                }}
              >
                <ChatBox ticketDetail={ticket} setTicketDetails={setTicket} />
                <TicketDetails
                  ticketDetail={ticket}
                  isLoading={isLoading}
                  refetch={fetchTicketInformation}
                />
              </Box>
            )}
            {activeSection === "Analysis" && <TicketAnalysis data={ticket} />}
            {activeSection === "Action Taken" && (
              <>
                <TicketRemarks data={ticket} refetch={fetchTicketInformation} />
              </>
            )}
            {activeSection === "Logs" && (
              <>
                <TicketLog data={ticket} />
              </>
            )}
            {activeSection === "Documents" && (
              <>
                <TicketDocuments data={ticket?.ticket_documents} />
              </>
            )}
            {activeSection === "Images" && (
              <>
                <TicketImages data={ticket?.ticket_images} />
              </>
            )}
            {activeSection === "All" && "All"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketInformationPage;
