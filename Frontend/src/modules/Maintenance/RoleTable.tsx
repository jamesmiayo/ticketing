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
import { Role } from "../../api/services/role";
import RoleForm from "./RoleForm";
import RoleUserPermission from "./RoleUserPermission";
import { GiPadlock } from "react-icons/gi";

export default function RoleTable({
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
  const [selectedRole, setSelectedRole] = useState(false);
  const [row, setRow] = useState([]);

  const handleOpenClose = () => {
    setOpen(!open);
    if (!open) setSelectedRow(null);
  };

  type HandleActiveRowParams = {
    dataActive: any;
  };

  const handleActiveRow = ({ dataActive }: HandleActiveRowParams) => {
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
      const response = await Role.deleteRole(selectedRow.id);
      toast.executeToast(response.message, "top-center", true, {
        type: "success",
      });

      await getDataList();
    } catch (error) {
      console.error("Error deleting Branch:", error);
      toast.executeToast(
        "Failed to delete Branch. Please try again.",
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
      const response = await Role.getRole();
      const data = response.map((row: any) => ({
        id: row.id,
        label: row.name,
        permissions: row.permissions,
        active: row.b_active,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
      setDataList(data);
    } catch (error) {
      console.error("Error fetching category list:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  function handleRolePermission(data: any) {
    setRow(data);
    setSelectedRole(true);
  }

  useEffect(() => {
    getDataList();
  }, []);

  const columns = [
    { field: "label", headerName: "Role", flex: 1 },
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
          <Tooltip title="Assign Permission Role" arrow>
            <IconButton
              color="primary"
              onClick={() => handleRolePermission(params.row)}
            >
              <GiPadlock size={30} />
            </IconButton>
          </Tooltip>
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
        <DialogTitle>{selectedRow ? "Edit Role" : "New Role"}</DialogTitle>
        <DialogContent>
          <RoleForm
            refetch={getDataList}
            onClose={handleOpenClose}
            defaultValues={selectedRow}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        maxWidth="lg"
        fullWidth
        open={selectedRole}
        onClose={() => setSelectedRole(false)}
      >
        <DialogTitle>Assign Permission on this Role</DialogTitle>
        <DialogContent sx={{ minHeight: "50vh" }}>
          <RoleUserPermission
            data={row}
            refetch={getDataList}
            onClose={setSelectedRole}
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
          New Role
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
