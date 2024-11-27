import { Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableComponents from "../../components/common/TableComponents";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { FaEye } from "react-icons/fa";
import UserTicketSatisfactory from "./UserTicketSatisfactory";

export default function UserTicketTableRow({ data }: any) {
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<any>([]);
  const [dataValue, setDataValue] = useState<any>([]);
  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", width: 140 },
    { field: "ticket_title", headerName: "Title", width: 140 },
    { field: "ticket_priority", headerName: "Priority", width: 140 },
    { field: "ticket_status", headerName: "Status", width: 140 },
    { field: "time_finished", headerName: "Time Finished", width: 140 },
    {
      field: "view",
      headerName: "Options",
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={"View Satisfactory"}>
          <IconButton onClick={() => handleViewClick(params.row)}>
            <FaEye />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  function handleViewClick(params: any) {
    setDataValue(params);
    setOpen(true);
  }
  useEffect(() => {
    const rowData = data?.ticket_dtl?.map((row: any, index: any) => {
      return {
        id: index,
        ticket_id: row.tickets.ticket_id,
        ticket_title: row.tickets.title,
        ticket_priority: row.tickets.ticket_priority,
        ticket_status: row.tickets.ticket_status,
        time_finished: row.tickets.time_finished,
        tickets: row.tickets,
      };
    });
    setRow(rowData);
  }, [data]);
  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
        <UserTicketSatisfactory data={dataValue} />
      </Dialog>
      <DialogContent>
      <DialogTitle>Ticket Of {data?.name} <br></br> Got {data?.satisfactory_percentage}% Customer SatisFactory In {data?.total_ticket} Tickets</DialogTitle>
        <TableComponents rows={row} columns={columns} />
      </DialogContent>
    </>
  );
}
