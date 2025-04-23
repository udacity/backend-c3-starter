import { TextField } from '@mui/material';

const InputField = ({ label, type, name, register, error }) => {
  return (
    <TextField
      {...register(name)}
      label={label}
      type={type}
      fullWidth
      error={!!error}
      helperText={error?.message}
      variant="outlined"
    />
  );
};

export default InputField;
