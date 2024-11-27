import { useState } from "react";
import TableComponents from "../../components/common/TableComponents";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import { FaEye } from "react-icons/fa";
import UserTicketTableRow from "./UserTicketTableRow";

export default function UserTicketTable({ data, isLoading }: any) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const columns = [
    { field: "emp_id", headerName: "Employee ID", width: 140 },
    { field: "branch", headerName: "Branch", width: 140 },
    { field: "department", headerName: "Department", width: 140 },
    { field: "section", headerName: "Section", width: 140 },
    { field: "name", headerName: "Name", width: 140 },
    { field: "email", headerName: "Email", width: 270 },
    { field: "total_ticket", headerName: "Total Ticket Assign", width: 270 },
    {
      field: "view",
      headerName: "Options",
      width: "100%",
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={"View"}>
          <IconButton onClick={() => handleViewClick(params.row)}>
            <FaEye />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  function handleViewClick(data: any) {
    setRowData(data);
    setOpen(true);
  }

  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        maxWidth="md"
        fullWidth
      >
        <UserTicketTableRow data={rowData} setOpen={setOpen} />
      </Dialog>
      <TableComponents rows={data} isLoading={isLoading} columns={columns} height={700}/>
    </>
  );
}
