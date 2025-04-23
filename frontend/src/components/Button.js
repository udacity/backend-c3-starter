import { Button } from '@mui/material';

const CustomButton = ({ children, onClick, color, variant, type }) => {
  return (
    <Button onClick={onClick} color={color} variant={variant} type={type}>
      {children}
    </Button>
  );
};

export default CustomButton;
