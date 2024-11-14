import { Box, Container } from "@mui/material";
import ChatBox from "./ChatBox";
import TicketDetails from "./TicketDetails";

const TicketInformationPage = () => {
  return (
    <>
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
    </>
  );
};

export default TicketInformationPage;
