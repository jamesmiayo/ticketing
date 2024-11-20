import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectItem from "../../components/common/SelectItem";
import { useForm } from "react-hook-form";
import { ticketValidationSchema } from "../../schema/Ticket/createTicketSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Department } from "../../api/services/department";
import { statusList } from "../../constants/constants";
import InputComponent from "../../components/common/InputComponent";

export default function TicketAssignee({ data, open, setOpen }: any) {
  const [department, setDepartment] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(ticketValidationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
    } catch (error) {}
  };

  const getDepartment = async () => {
    try {
      const response = await Department.getDepartment();
      const data = response.map((row: any) => ({
        value: row.id,
        label: row.department_description,
      }));
      setDepartment(data);
    } catch (error) {
      console.error("Failed to fetch department:", error);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
            />
            <SelectItem
              label="Section"
              control={control}
              options={[]}
              errors={errors}
              name="section"
              fullWidth
              sx={{ mt: 2 }}
            />
            <SelectItem
              label="User"
              control={control}
              options={[]}
              errors={errors}
              name="user"
              fullWidth
              sx={{ mt: 2 }}
            />
            <SelectItem
              label="Status"
              control={control}
              options={statusList}
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
      </DialogContent>
    </Dialog>
  );
}
