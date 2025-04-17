import { Button, Stack } from '@mui/material';

const BasicButtons = ({ variant = "text" }) => {
  return (
    <Stack spacing={2} direction="row">
      {variant === "text" && <Button variant="text">Text</Button>}
      {variant === "contained" && <Button variant="contained">Contained</Button>}
      {variant === "outlined" && <Button variant="outlined">Outlined</Button>}
    </Stack>
  );
}

export default BasicButtons;
