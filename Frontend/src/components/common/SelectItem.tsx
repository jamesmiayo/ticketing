import { Controller } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

const SelectItem = ({
  label,
  name,
  control,
  errors,
  options,
  defaultValue,
  onChange,
  disabled, // Add disabled prop
}: any) => {
  const error = errors?.[name];

  return (
    <FormControl
      size="small"
      variant="outlined"
      fullWidth
      error={!!error}
      disabled={disabled} 
    >
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field }) => (
          <>
            <Select
              {...field}
              label={label}
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e.target.value);
              }}
              disabled={disabled} // Pass disabled to Select
            >
              {options.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
};

export default SelectItem;
