import React from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CategorySelector from '../../listing/CategoryList';
import { ticketApi } from '../../api/services/ticket';
import { ticketValidationSchema } from '../../schema/Ticket/createTicketSchema';
import SelectItem from '../../components/common/SelectItem';

interface TicketCreationFormProps {
  onCreate: (ticket: any) => void;
  refetch: any;
}

interface TicketFormInputs {
  title: string;
  concern: string;
  category: string;
  sub_category: string;
  status: string;
}

const statusOptions = [
  { value: '0', label: 'Open' },
  { value: '6', label: 'Completed' },
];

const test = [
  { value: '1', label: 'Category 1' },
  { value: '2', label: 'Category 2' },
  { value: '3', label: 'Category 3' },
]

const TicketCreationForm: React.FC<TicketCreationFormProps> = ({
  onCreate,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TicketFormInputs>({
    resolver: yupResolver(ticketValidationSchema), 
  });

  const onSubmit = async (data:any) => {
    console.log(data);
    try {
      const newTicket = {
        ...data,
        status: data.status,
      };
      await ticketApi.createTicket(newTicket);

      onCreate(newTicket);
      refetch();

      reset(); // Reset the form fields
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Ticket Title"
              {...register('title')}
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Concern"
              {...register('concern')}
              fullWidth
              error={!!errors.concern}
              helperText={errors.concern?.message}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <SelectItem label="Category" control={control} options={test} name="category"/>
          <SelectItem label="Sub Category" control={control} options={test} name="sub_category"/> 
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <CategorySelector />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Status">
                    {statusOptions.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.status && (
                <Box sx={{ color: 'red', fontSize: '0.75rem', marginTop: 0.5 }}>
                  {errors.status.message}
                </Box>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Ticket
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TicketCreationForm;
