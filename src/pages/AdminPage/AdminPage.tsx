import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type {
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
  GridRowModesModel,
  GridValidRowModel,
} from '@mui/x-data-grid';
import type { IUserDto } from '../../types/data-contracts';
import { getAllUsers } from '../../services/getAllUsers.query';
import { useAuthContext } from '../../providers/AuthProvider/hooks';
import { updateUser } from '../../services/updateUser.mutation';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [users, setUsers] = useState<IUserDto[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [error, setError] = useState('');

  useEffect(() => {
    getAllUsers({
      onSuccess: (users) => {
        const filteredUsers = users.filter(({ id }) => id !== user?.id);
        setUsers(filteredUsers);
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  }, []);

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow } as IUserDto;

    updateUser({
      id: updatedRow.id,
      dto: updatedRow,
      onError: (err) => console.log(err.message),
      onSuccess: (updatedUser) => {
        setUsers((prev) =>
          prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      },
    });

    return updatedRow;
  };

  const columns: GridColDef<IUserDto>[] = [
    {
      field: 'image',
      headerName: 'Avatar',
      width: 80,
      renderCell: (params: GridRenderCellParams<GridValidRowModel>) => (
        <Avatar
          src={params?.value}
          onClick={() => navigate(`/users/${params.row.id}`)}
        />
      ),
      sortable: false,
      filterable: false,
      editable: false,
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Name', flex: 1, editable: true },
    { field: 'lastName', headerName: 'Last Name', flex: 1, editable: true },
    { field: 'email', headerName: 'Email', flex: 1.5, editable: true },
    { field: 'role', headerName: 'Role', flex: 1, editable: true },
    {
      field: 'birthDate',
      headerName: 'Date of birth',
      flex: 1,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1,
      editable: true,
      valueGetter: (_, row) => row?.address?.city,
      valueSetter: (city: string, row) => {
        const user = { ...row };
        user.address = { ...user.address, city };
        return user;
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      editable: true,
      valueGetter: (_, row) => row?.address?.country,
      valueSetter: (country: string, row) => {
        const user = { ...row };
        user.address = { ...user.address, country };
        return user;
      },
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Admin-panel — users
      </Typography>
      {!users ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={users}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(model) => setRowModesModel(model)}
          processRowUpdate={processRowUpdate}
        />
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default AdminPage;
