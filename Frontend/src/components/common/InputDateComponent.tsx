import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const InputDateComponent = ({
  label,
  name,
  control,
  defaultValue,
  errors,
  onChange,
  ...rest
}: any) => {
  const error = errors?.[name];
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          type="date"
          fullWidth
          variant="outlined"
          size="small"
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{
            shrink: true, // Ensures the label does not overlap with the input value
          }}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) onChange(e.target.value);
          }}
        />
      )}
    />
  );
};

export default InputDateComponent;
