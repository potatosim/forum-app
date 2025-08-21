import {
  Alert,
  Box,
  Button,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import PasswordInput from './PasswordInput';
import { loginUser } from '../../services/loginUser.mutation';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../enum/AppRoutes';
import { useState } from 'react';
import { LocalStorageKeys } from '../../enum/LocalStorageKeys';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    loginUser(
      {
        username,
        password,
      },
      {
        onSuccess: ({ accessToken }) => {
          localStorage.setItem(LocalStorageKeys.AccessToken, accessToken);
          navigate(AppRoutes.Home);
        },
        onError: (error) => {
          setError((error.response?.data as Error).message);
        },
      }
    );
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
            if (error) {
              setError('');
            }
            setUserName(e.target.value);
          }}
          value={username}
          fullWidth
          error={!!error}
        />
        <PasswordInput
          value={password}
          setValue={(value) => {
            if (error) {
              setError('');
            }
            setPassword(value);
          }}
          error={!!error}
        />
        <Button
          fullWidth
          variant="contained"
          color="warning"
          onClick={handleLogin}>
          Log in
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
};

export default LoginForm;
