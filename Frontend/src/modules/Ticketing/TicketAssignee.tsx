import { useEffect, useState } from "react";
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
import { Department } from "../../api/services/department";
import { User } from "../../api/services/user";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
import { statusListAssign } from "../../constants/constants";
import SelectItem from "../../components/common/SelectItem";
import InputComponent from "../../components/common/InputComponent";

export default function TicketAssignee({ data, setOpen, refetch }: any) {
  const [department, setDepartment] = useState<any>([]);
  const [section, setSection] = useState<any>([]);
  const [user, setUser] = useState<any>([]);
  const [userOption, setUserOption] = useState<any>([]);
  const toast = useExecuteToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    register,
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
    } catch (error) {
      console.error("Failed to assign ticket:", error);
      toast.executeToast("Failed to assign ticket", "top-center", true, {
        type: "error",
      });
    }
  };

  const getDepartment = async () => {
    try {
      const response = await Department.getDepartment();
      const data = response.map((row: any) => ({
        value: row.id,
        label: row.department_description,
        section: row.section,
      }));
      setDepartment(data);
    } catch (error) {
      console.error("Failed to fetch department:", error);
    }
  };

  const getUser = async () => {
    try {
      const response = await User.getUser();
      setUser(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const getSection = (departmentId: number) => {
    const data = department
      .find((department: any) => department.value === departmentId)
      ?.section.map((row: any) => ({
        value: row.id,
        label: row.section_description,
      }));
    setSection(data);
    setUserOption([]);
  };

  const handleSection = (sectionId: string) => {
    const data = user
      .filter((row: any) => row.section_id === sectionId)
      .map((row: any) => ({
        value: row.id,
        label: row.name,
      }));
    setUserOption(data);
  };

  useEffect(() => {
    getDepartment();
    getUser();
  }, []);

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
              label="Department"
              control={control}
              options={department}
              errors={errors}
              name="department"
              fullWidth
              onChange={(e: any) => getSection(e)}
              startAdornment={<Business color="action" />}
            />
            <SelectItem
              label="Section"
              control={control}
              options={section}
              errors={errors}
              name="section"
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
            <SelectItem
              label="Status"
              control={control}
              options={statusListAssign}
              errors={errors}
              name="status"
              fullWidth
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
