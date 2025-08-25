import {
  Alert,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from '@mui/material';
import type { IUserDto } from '../../types/data-contracts';
import { useEffect, useState, type MouseEventHandler } from 'react';
import { getAllUsers } from '../../services/getAllUsers.query';
import ClearIcon from '@mui/icons-material/Clear';
const UsersFilter = ({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: number | null;
  setSelectedUser: (user: number | null) => void;
}) => {
  const [users, setUsers] = useState<IUserDto[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllUsers({
      onSuccess: (users) => {
        setUsers(users);
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  }, []);

  const handleChange: SelectProps<number>['onChange'] = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleClear: MouseEventHandler = (event) => {
    event.stopPropagation();
    setSelectedUser(null);
  };

  return (
    <Box sx={{ minWidth: '200px' }}>
      <FormControl fullWidth>
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUser ?? ''}
          onChange={handleChange}
          variant="filled"
          IconComponent={() =>
            selectedUser && (
              <IconButton onClick={handleClear} size="small">
                <ClearIcon />
              </IconButton>
            )
          }>
          {users.map((user) => (
            <MenuItem
              key={user.id}
              value={user.id}
              onChange={(e) => console.log({ e })}>
              {user.firstName} {user.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default UsersFilter;
