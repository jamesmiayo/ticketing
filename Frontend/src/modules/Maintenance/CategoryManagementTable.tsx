import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import TableComponents from "../../components/common/TableComponents";
import CategoryForm from "./CategoryForm";
import { getCategoryAPI } from "../../api/services/getCategoryList";
import { useExecuteToast } from "../../context/ToastContext";
import { ConfirmDialog } from "../../components/common/ConfirmationModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function CategoryManagementTable({
  onPageChange,
  pageProps,
  customInputs,
  onSubmit,
  maxCount,
}: any) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleOpenClose = () => {
    setOpen(!open);
    if (!open) setSelectedCategory(null);
  };

  type HandleActiveRowParams = {
    dataActive: any;
    isEdit: boolean;
  };

  const handleActiveRow = ({ dataActive, isEdit }: HandleActiveRowParams) => {
    setSelectedCategory(dataActive);

    if (!isEdit) {
      setConfirmOpen(true);
    } else {
      setOpen(true);
    }
  };

  const handleDelete = (category: any) => {
    setSelectedCategory(category);
    setDeleteConfirmOpen(true);
  };

  const toast = useExecuteToast();

  const handleConfirmToggle = async () => {
    if (!selectedCategory) return;
    const updatedStatus = selectedCategory.active ? 0 : 1;
    try {
      setLoading(true);

      const responseUpdate = await getCategoryAPI.updateCategory({
        id: selectedCategory.id,
        body: {
          b_active: updatedStatus,
          category_description: selectedCategory.label,
          category_id: selectedCategory.category_id,
        },
      });
      toast.executeToast(responseUpdate.message, "top-center", true, {
        type: "success",
      });

      await getCategoryList();
    } catch (error) {
      console.error("Error updating category status:", error);
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;
    try {
      setLoading(true);
      console.log(selectedCategory);
      const response = await getCategoryAPI.deleteCategory(selectedCategory.id);
      toast.executeToast(response.message, "top-center", true, {
        type: "success",
      });

      await getCategoryList();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.executeToast(
        "Failed to delete category. Please try again.",
        "top-center",
        true,
        { type: "error" }
      );
    } finally {
      setLoading(false);
      setDeleteConfirmOpen(false);
    }
  };

  const getCategoryList = async () => {
    try {
      setLoading(true);
      const response = await getCategoryAPI.getAllData();
      const data = response.map((row: any) => ({
        id: row.id,
        label: row.category_description,
        sub_category: row.sub_category,
        active: row.b_active,
        category_id: row.category_id,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
      setCategories(data);
    } catch (error) {
      console.error("Error fetching category list:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const columns = [
    {
      field: "category_id",
      headerName: "Category ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    { field: "label", headerName: "Description", flex: 1 },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <Switch
          checked={params.row.active === 1}
          onChange={() =>
            handleActiveRow({ dataActive: params.row, isEdit: false })
          }
          color="primary"
        />
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
              onClick={() =>
                handleActiveRow({ dataActive: params.row, isEdit: true })
              }
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
          {selectedCategory ? "Edit Category" : "New Category"}
        </DialogTitle>
        <DialogContent>
          <CategoryForm
            refetch={getCategoryList}
            onClose={handleOpenClose}
            defaultValues={selectedCategory}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        selectedData={selectedCategory}
        onConfirm={handleConfirmToggle}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        selectedData={selectedCategory}
        onConfirm={handleDeleteConfirm}
        newMessage={
          <span style={{ color: "red", fontWeight: "bold" }}>DELETE</span>
        }
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="success" onClick={handleOpenClose}>
          New Category
        </Button>
      </Box>
      <TableComponents
        columns={columns}
        rows={categories}
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
