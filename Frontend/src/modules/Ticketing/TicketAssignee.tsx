import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import SelectItem from "../../components/common/SelectItem";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Department } from "../../api/services/department";
import {  statusListAssign } from "../../constants/constants";
import InputComponent from "../../components/common/InputComponent";
import { User } from "../../api/services/user";
import { ticketAssign } from "../../schema/Ticket/createTicketAssign";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
export default function TicketAssignee({ data, setOpen , refetch }: any) {
  const [department, setDepartment] = useState<any>([]);
  const [section, setSection] = useState<any>([]);
  const [user, setUser] = useState<any>([]);
  const [userOption, setUserOption] = useState<any>([]);
  const toast = useExecuteToast();

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(ticketAssign),
  });

  const onSubmit = async (formData: any) => {
    setOpen(false)
    try {
      const response = await ticketApi.ticketAssignee(data.id , formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      refetch();
      reset();
    } catch (error) {
      console.error("Failed to assign ticket:", error);
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
      console.error("Failed to fetch department:", error);
    }
  };

  const getSection = (departmentId: number) => {
    const data = department
      .find((department: any) => department.value === departmentId)
      ?.section.map((row: any) => {
        return { value: row.id, label: row.section_description };
      });
    setSection(data);
    setUserOption([]);
  };

  const handleSection = (section: string) => {
    const data = user
      .filter((row: any) => row.section_id === section)
      .map((row: any) => {
        return { value: row.id, label: row.name };
      });
    setUserOption(data);
  };

  useEffect(() => {
    getDepartment();
    getUser();
  }, []);

  return (
    <>
      <DialogTitle>Assigne Ticket on {data?.title} </DialogTitle>
      <DialogContent>
        <div style={{ padding: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SelectItem
              label="Department"
              control={control}
              options={department}
              errors={errors}
              name="department"
              fullWidth
              sx={{ mt: 2 }}
              onChange={(e: any) => getSection(e)}
            />
            <SelectItem
              label="Section"
              control={control}
              options={section}
              errors={errors}
              name="section"
              fullWidth
              sx={{ mt: 2 }}
              onChange={(e: any) => handleSection(e)}
            />
            <SelectItem
              label="User"
              control={control}
              options={userOption}
              errors={errors}
              name="emp_id"
              fullWidth
              sx={{ mt: 2 }}
            />
            <SelectItem
              label="Status"
              control={control}
              options={statusListAssign}
              errors={errors}
              name="status"
              fullWidth
              sx={{ mt: 2 }}
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Assign Ticket
            </Button>
          </form>
        </div>
      </DialogContent></>
  );
}
