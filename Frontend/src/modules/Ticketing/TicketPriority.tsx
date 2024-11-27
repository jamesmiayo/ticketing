import { Button, DialogContent, DialogTitle } from '@mui/material';
import SelectItem from '../../components/common/SelectItem';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { priorityList } from '../../constants/constants';
import { ticketApi } from '../../api/services/ticket';
import { useExecuteToast } from '../../context/ToastContext';
import { updatePrioritySchema } from '../../schema/Ticket/updatePriority';

export default function TicketPriority({ data , setOpen , refetch}: any) {
    const toast = useExecuteToast();

    const {
        reset,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<any>({
        resolver: yupResolver(updatePrioritySchema),
      });
    
    const onSubmit = async (formData: any) => {
        console.log(formData);
        setOpen(false)
        try {
        const response = await ticketApi.updatePriority(data.id , formData)
        toast.executeToast(response?.message, "top-center", true, {
            type: "success",
          });
          refetch();
          reset();    
    } catch (error) {
          console.error("Failed to assign ticket:", error);
        }
      };

    return (
    <>
      <DialogTitle>Update Priority in {data?.title}</DialogTitle>
      <DialogContent>
      <div style={{ padding: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
            <SelectItem
              label="Priority"
              control={control}
              options={priorityList}
              errors={errors}
              name="priority"
              fullWidth
              sx={{ mt: 2 }}
            />
             <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
        </form>
        </div>
      </DialogContent>
    </>
  );
}
