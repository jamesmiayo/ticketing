// TicketPage.tsx
import React from 'react';
import TicketList from './TicketList'; // Import the TicketList component
import TicketTable from './TicletTable';

const TicketPage: React.FC = () => {
  return (
    <div>
      <h1>Ticket Overview</h1>
      <TicketList /> {/* Render the TicketList component here */}
      <TicketTable />
    </div>
  );
};

export default TicketPage;
