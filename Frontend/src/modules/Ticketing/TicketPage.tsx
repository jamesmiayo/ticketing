import React, { useEffect, useState } from "react";
import TicketCreationForm from "./TicketCreationForm";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import TicketTable from "./TicketTable";
import { ticketApi } from "../../api/services/ticket";
import { useQuery } from "../TicketInformation/TicketDetails";

import TicketSideBar from "./TicketSideBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  filterFormtype,
  filterTicket,
} from "../../schema/Ticket/ticketSearchSchema";

const TicketPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const query = useQuery();
  const [page, setPage] = useState(parseInt(query.get("page") || "1"));
  const [maxPage, setMaxPage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<filterFormtype>({
    resolver: yupResolver(filterTicket),
  });

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const result = await ticketApi.getTicketData(page);
      if (result && result.data) {
        const formattedTickets = result.data.map((ticket: any) => ({
          id: ticket.id,
          ticket_id: ticket.ticket_id || "N/A",
          requestedBy: ticket.user?.name || "N/A",
          title: ticket.title || "N/A",
          category:
            ticket.sub_category?.category?.category_description || "N/A",
          subCategory: ticket.sub_category?.subcategory_description || "N/A",
          status: ticket?.ticket_logs_latest?.ticket_status || "Unknown",
          created_at: ticket?.ticket_logs_latest?.created_at,
          assignee: ticket?.ticket_logs_latest?.assignee?.name || "No assignee",
          updated_by:
            ticket?.ticket_logs_latest?.updated_by?.name || "No assignee",
        }));
        setData(formattedTickets);
        const maxPage = result.last_page;
        setMaxPage(maxPage);
      } else {
        console.warn("Unexpected data structure:", result);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onSubmit: SubmitHandler<filterFormtype> = async (formData) => {
    try {
      setLoading(true);
      const result = await ticketApi.getTicketData("", formData.title);
      if (result && result.data) {
        const formattedTickets = result.data.map((ticket: any) => ({
          id: ticket.id,
          ticket_id: ticket.ticket_id || "N/A",
          requestedBy: ticket.user?.name || "N/A",
          title: ticket.title || "N/A",
          category:
            ticket.sub_category?.category?.category_description || "N/A",
          subCategory: ticket.sub_category?.subcategory_description || "N/A",
          status: ticket?.ticket_logs_latest?.ticket_status || "Unknown",
          created_at: ticket?.ticket_logs_latest?.created_at,
          assignee: ticket?.ticket_logs_latest?.assignee?.name || "No assignee",
          updated_by:
            ticket?.ticket_logs_latest?.updated_by?.name || "No assignee",
        }));
        setData(formattedTickets);
      } else {
        console.warn("Unexpected data structure:", result);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Ticket List</h1>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Ticket
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <TicketSideBar />
        <TicketTable
          tickets={data}
          isLoading={loading}
          isOptions={true}
          onPageChange={handlePageChange}
          pageProps={page}
          customInputs={[
            {
              name: "title",
              label: "Title",
              register: register,
              errors: errors,
            },
          ]}
          maxCount={maxPage}
          onSubmit={handleSubmit(onSubmit)} // Pass submit handler
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Ticket</DialogTitle>
        <DialogContent>
          <TicketCreationForm
            onCreate={() => setOpen(false)}
            refetch={() => fetchData(page)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketPage;
