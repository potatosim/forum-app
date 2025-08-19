import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, OutlinedInput } from '@mui/material';
import { useState } from 'react';

interface PasswordInputProps {
  value: string;
  setValue: (value: string) => void;
  error: boolean;
}

const PasswordInput = ({ error, setValue, value }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <OutlinedInput
      sx={{ width: '100%' }}
      color="warning"
      size="small"
      required
      value={value}
      placeholder="Password"
      error={error}
      type={isVisible ? 'text' : 'password'}
      onChange={(e) => setValue(e.target.value)}
      endAdornment={
        <IconButton color="warning" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      }
    />
  );
};

export default PasswordInput;
