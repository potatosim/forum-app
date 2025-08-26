import {
  Alert,
  Box,
  Button,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import PasswordInput from './PasswordInput';
import { useState } from 'react';
import type { ILoginUserDto } from '../../types/data-contracts';

interface ILoginFormProps {
  onSubmit: (data: ILoginUserDto) => void;
  error: string;
}

const LoginForm = ({ error, onSubmit }: ILoginFormProps) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  return (
    <Paper
      sx={{
        p: 4,
        height: '40vh',
        minWidth: '20%',
      }}
      elevation={12}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          rowGap: '1rem',
        }}>
        <Typography>Login into your account</Typography>
        <OutlinedInput
          size="small"
          color="warning"
          required
          placeholder="Login"
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={username}
          fullWidth
          error={!!error}
        />
        <PasswordInput
          value={password}
          setValue={(value) => {
            setPassword(value);
          }}
          error={!!error}
        />
        <Button
          fullWidth
          variant="contained"
          color="warning"
          onClick={handleSubmit}>
          Log in
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
};

export default LoginForm;
