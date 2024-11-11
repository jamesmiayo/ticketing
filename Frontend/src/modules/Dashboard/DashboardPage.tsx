import React from "react";
import Box from "@mui/material/Box";
import TicketPage from "../Ticketing/TicketPage";

const Dashboard: React.FC<any> = () => {
  return (
    <Box display="flex">
      <Box flex={1}>
        <Box p={3}>
          <TicketPage />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
