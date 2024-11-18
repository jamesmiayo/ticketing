import { Box, Container } from "@mui/material";
import ChatBox from "./ChatBox";
import TicketDetails from "./TicketDetails";

const TicketInformationPage = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <h1>Ticket Information</h1>
          <Container
            sx={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
            }}
          >
            <ChatBox />
            <TicketDetails />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default TicketInformationPage;
