import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import { useExecuteToast } from "../../context/ToastContext";
import { ConfirmDialog } from "../../components/common/ConfirmationModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import SLAForm from "./SLAForm";
import { SLA } from "../../api/services/SLA";

export default function SLATable({
  onPageChange,
  pageProps,
  customInputs,
  onSubmit,
  maxCount,
}: any) {
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleOpenClose = () => {
    setOpen(!open);
    if (!open) setSelectedRow(null);
  };

  const handleActiveRow = ({ dataActive }: { dataActive: any }) => {
    setSelectedRow(dataActive);
    setOpen(true);
  };

  const handleDelete = (category: any) => {
    setSelectedRow(category);
    setDeleteConfirmOpen(true);
  };

  const toast = useExecuteToast();

  const handleDeleteConfirm = async () => {
    if (!selectedRow) return;
    try {
      setLoading(true);
      const response = await SLA.deleteSLA(selectedRow.id);
      toast.executeToast(response.message, "top-center", true, {
        type: "success",
      });

      await getDataList();
    } catch (error) {
      console.error("Error deleting SLA:", error);
      toast.executeToast(
        "Failed to delete SLA. Please try again.",
        "top-center",
        true,
        { type: "error" }
      );
    } finally {
      setLoading(false);
      setDeleteConfirmOpen(false);
    }
  };

  const getDataList = async () => {
    try {
      setLoading(true);
      const response = await SLA.getSLA();

      const data = response.map((row: any) => ({
        id: row.id,
        label: row.priority_label,
        data_id: row.SLA_ID,
        response_time: row.response_time,
        created_at: row.created_at,
        updated_at: row.updated_at,
        priority_color: row.priority_color || "#FFFFFF", // Default to white if no color provided
      }));
      setDataList(data);
    } catch (error) {
      console.error("Error fetching SLA list:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const columns = [
    {
      field: "data_id",
      headerName: "SLA ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    { field: "label", headerName: "Priority", flex: 1 },
    { field: "3", headerName: "Response Time", flex: 1 },
    {
      field: "priority_color",
      headerName: "Color",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: params.row.priority_color,
              border: "1px solid #ddd",
            }}
          />
        </Box>
      ),
    },
    { field: "created_at", headerName: "Created Date", flex: 1 },
    { field: "updated_at", headerName: "Updated Date", flex: 1 },
    {
      field: "option",
      headerName: "Options",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Tooltip title="Edit" arrow>
            <IconButton
              color="primary"
              onClick={() => handleActiveRow({ dataActive: params.row })}
            >
              <CiEdit size={30} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" arrow>
            <IconButton color="error" onClick={() => handleDelete(params.row)}>
              <MdDelete size={30} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Dialog open={open} onClose={handleOpenClose}>
        <DialogTitle>
          {selectedRow ? "Edit Priority" : "New Priority"}
        </DialogTitle>
        <DialogContent>
          <SLAForm
            refetch={getDataList}
            onClose={handleOpenClose}
            defaultValues={selectedRow}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        selectedData={selectedRow}
        onConfirm={handleDeleteConfirm}
        newMessage={
          <span style={{ color: "red", fontWeight: "bold" }}>DELETE</span>
        }
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="success" onClick={handleOpenClose}>
          New Priority
        </Button>
      </Box>
      <TableComponents
        columns={columns}
        rows={dataList}
        onPageChange={onPageChange}
        pageProps={pageProps}
        height={400}
        width="100%"
        customInputs={customInputs}
        onSubmit={onSubmit}
        maxCount={maxCount}
        isLoading={loading}
      />
    </>
  );
}
