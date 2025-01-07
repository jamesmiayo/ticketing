import { useEffect, useState } from "react";
import { User } from "../../api/services/user";
import TableComponents from "../../components/common/TableComponents";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import { FaBuilding } from "react-icons/fa";
import SectionModal from "./UserModal/SectionModal";
import BranchModal from "./UserModal/BranchModal";
import RoleModal from "./UserModal/RoleModal";
import { FaUserCircle } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  userSearchSchema,
  userSearchSchemaFormType,
} from "../../schema/User/UserSearchSchema";
import { Role } from "../../api/services/role";

export default function UserManagementTable() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<any>();
  const [row, setRow] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  
  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<userSearchSchemaFormType>({
    resolver: yupResolver(userSearchSchema),
  });

  const fetchData = async (filterData:any) => {
    setLoading(true);
    try {
      const response = await User.getUser(filterData);
      const data = response.map((row: any) => ({
        id: row.id,
        emp_id: row.emp_id,
        name: row.name,
        email: row.email,
        section: row?.section?.section_description,
        branch: row?.branch?.branch_description,
        department: row?.section?.department?.department_description,
        division: row?.section?.department?.division?.division_description,
        roles: row?.roles?.[0]?.name || [],
      }));
      setData(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<userSearchSchemaFormType> = async (formData: any) => {
    try {
      setLoading(true);
      fetchData(formData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRolesData = async () => {
    setLoading(true);
    try {
      const response = await Role.getRole();
      const data = response.map((row: any) => ({
        value: row.id,
        label: row.name,
      }));
      setRoles(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(null);
    getRolesData();
  }, []);

  const userSearchFilter = [
    {
      name: "employee_id",
      label: "Employee ID",
      register: register,
      errors: errors,
      type: "text",
    },
    {
      name: "name",
      label: "Name",
      register: register,
      errors: errors,
      type: "text",
    },
    {
      name: "role_id",
      label: "Role",
      register: register,
      control: control,
      errors: errors,
      options: roles,
      type: "select",
    },
  ];

  const columns = [
    { field: "emp_id", headerName: "Employee ID", width: 140 },
    { field: "branch", headerName: "Branch", width: 140 },
    { field: "division", headerName: "Division", width: 140 },
    { field: "department", headerName: "Department", width: 140 },
    { field: "section", headerName: "Section", width: 140 },
    { field: "name", headerName: "Name", width: 140 },
    { field: "roles", headerName: "Role", width: 140 },
    {
      field: "view",
      headerName: "Options",
      width: "100%",
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title={"Change User Branch"}>
            <IconButton onClick={() => handleClick(params.row, "branch")}>
              <BsBuildingsFill />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Change User Section"}>
            <IconButton onClick={() => handleClick(params.row, "section")}>
              <FaBuilding />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Change User Role"}>
            <IconButton onClick={() => handleClick(params.row, "role")}>
              <FaUserCircle />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  function handleClick(params: any, modal: string) {
    setOpen(true);
    setModal(modal);
    setRow(params);
  }
  const handleReset = () => {
    reset();
    fetchData(null);
  };
  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        maxWidth="md"
        fullWidth
      >
        {modal === "branch" ? (
          <BranchModal data={row} setOpen={setOpen} refetch={fetchData} />
        ) : modal === "section" ? (
          <SectionModal data={row} setOpen={setOpen} refetch={fetchData} />
        ) : (
          <RoleModal data={row} setOpen={setOpen} refetch={fetchData} />
        )}
      </Dialog>
      <TableComponents
        rows={data}
        columns={columns}
        isLoading={loading}
        customInputs={userSearchFilter}
        onReset={handleReset}
        onSubmit={handleSubmit(onSubmit)}
        height={550}
      />
    </>
  );
}
