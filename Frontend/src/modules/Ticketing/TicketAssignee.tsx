import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
} from "@mui/material";
import { AssignmentInd, Business, Group } from "@mui/icons-material";
import { ticketAssign } from "../../schema/Ticket/createTicketAssign";
import { User } from "../../api/services/user";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
import SelectItem from "../../components/common/SelectItem";
import InputComponent from "../../components/common/InputComponent";
import { Division } from "../../api/services/division";
import { useAuth } from "../../context/AuthContext";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider";

export default function TicketAssignee({ data, setOpen, refetch }: any) {
  const { permission } = useContext(PermissionContext);
  const [division, setDivision] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [section, setSection] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const { user } = useAuth();
  const [userOption, setUserOption] = useState<any>([]);
  const toast = useExecuteToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    register,
    watch,
  } = useForm<any>({
    resolver: yupResolver(ticketAssign),
  });

  const onSubmit = async (formData: any) => {
    setOpen(false);
    try {
      const response = await ticketApi.ticketAssignee(data.id, formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      refetch();
      reset();
    } catch (error: any) {
      toast.executeToast(error?.response?.data?.message, "top-center", true, {
        type: "error",
      });
    }
  };

  const getUser = async () => {
    try {
      const response = await User.getUser(null);
      setUserData(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleDepartment = (departmentId: any) => {
    const data = department
      ?.find((department: any) => department.value === departmentId)
      ?.section?.map((row: any) => ({
        value: row.id,
        label: row.section_description,
      }));
    setSection(data || []);
  };

  const getDivision = async () => {
    try {
      const response = await Division.getDivision();
      const data = response?.map((row: any) => ({
        value: row.id,
        label: row.division_description,
        department: row.department,
      }));
      setDivision(data);
    } catch (error) {
      console.error("Failed to fetch division:", error);
    }
  };

  const handleDivision = (department: string) => {
    const data = division
      .find((row: any) => row.value == department)
      ?.department?.map((row: any) => {
        return {
          value: row.id,
          label: row.department_description,
          section: row.section,
        };
      });
    setDepartment(data || []);
    setSection([]);
    setUserOption([]);
  };

  const handleSection = (section: any) => {
    const data = userData
      .filter((row: any) => row.section_id === section)
      ?.map((row: any) => ({
        value: row.id,
        label: row.name,
      }));
    setUserOption(data);
  };

  const divisionCode = watch("division");
  const departmentCode = watch("department");
  const sectionCode = watch("section");
  useEffect(() => {
    getUser();
    getDivision();
    getUser();

    if (user.roles[0].name !== "Admin") {
      reset({
        division: user?.section?.department?.division_id,
        department: user?.section?.department_id,
        section: user?.section_id,
      });
    }
  }, []);

  useEffect(() => {
    if (divisionCode) {
      handleDivision(divisionCode);
    }
    if (departmentCode) {
      handleDepartment(Number(departmentCode));
    }
    if (sectionCode) {
      handleSection(Number(sectionCode));
    }
  }, [
    divisionCode,
    departmentCode,
    sectionCode,
    section,
    division,
    department,
  ]);

  return (
    <>
      <DialogTitle>
        <Typography variant="h5" align="center" fontWeight="bold">
          Assign Ticket{" "}
          <Box component="span" sx={{ color: "error.main", ml: 1 }}>
            ({data?.ticket_id})
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <SelectItem
              label="Division"
              control={control}
              options={division}
              errors={errors}
              name="division"
              disabled={!permission?.includes("Can Change Division Assignee")}
              fullWidth
              sx={{ mt: 2 }}
              onChange={(e: any) => handleDivision(e)}
            />
            <SelectItem
              label="Department"
              control={control}
              options={department}
              errors={errors}
              name="department"
              disabled={!permission?.includes("Can Change Department Assignee")}
              fullWidth
              onChange={(e: any) => handleDepartment(e)}
              startAdornment={<Business color="action" />}
            />
            <SelectItem
              label="Section"
              control={control}
              options={section}
              errors={errors}
              name="section"
              disabled={!permission?.includes("Can Change Section Assignee")}
              fullWidth
              onChange={(e: any) => handleSection(e)}
              startAdornment={<Group color="action" />}
            />
            <SelectItem
              label="User"
              control={control}
              options={userOption}
              errors={errors}
              name="emp_id"
              fullWidth
              startAdornment={<AssignmentInd color="action" />}
            />
            <InputComponent
              name="remarks"
              label="Remarks"
              register={register}
              errors={errors}
              fullWidth
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Assign Ticket
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </>
  );
}
