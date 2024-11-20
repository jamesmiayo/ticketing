import { Box, Container, Typography } from "@mui/material";
import ChatBox from "./ChatBox";
import TicketDetails from "./TicketDetails";
import TicketSideBar from "../Ticketing/TicketSideBar";

const TicketInformationPage = () => {
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
            <ChatBox />
            <TicketDetails />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default TicketInformationPage;
