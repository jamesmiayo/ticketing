import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Box } from '@mui/material';

export default function TicketAnalysis({data} : any) {
    return (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          backgroundColor: "white",
        }}
      >
        <Timeline position="alternate">
        {data?.ticket_statuses.map((ticket: any) => (
          <TimelineItem key={ticket.id}>
            <TimelineOppositeContent color="text.secondary">
              {ticket.created_at}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{ticket.ticket_status}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      </Box>
      );
}
