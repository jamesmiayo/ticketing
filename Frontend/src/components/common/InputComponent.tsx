import { TextField } from "@mui/material";

const InputComponent = ({
  name,
  label,
  register,
  errors,
  fullWidth = true,
  multiline = false,
  rows,
  ...rest
}: any) => {
  return (
    <TextField
      label={label}
      {...register(name)}
      fullWidth={fullWidth}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      size="small"
      {...rest}
    />
  );
};

export default InputComponent;
