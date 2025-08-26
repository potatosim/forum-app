import { useState, type ChangeEvent } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';
import type { IUserDto } from '../../types/data-contracts';
import { useAuthContext } from '../../providers/AuthProvider/hooks';
import { AppRoutes } from '../../enum/AppRoutes';

const Input = styled('input')({
  display: 'none',
});

const parseDate = (date: string) => {
  const [year, month, day] = date.split('-');

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const UserProfilePage = () => {
  const { user, setUser } = useAuthContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<IUserDto>(user as IUserDto);

  const handleChange = (field: keyof IUserDto | string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.replace(
        'address.',
        ''
      ) as keyof IUserDto['address'];

      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setFormData(user as IUserDto);
    setIsEditMode(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setFormData((prev) => ({ ...prev, image: imgUrl }));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: '1.5rem',
      }}>
      <Card sx={{ maxWidth: 800, width: '100%' }}>
        <CardHeader
          avatar={
            <Avatar
              src={formData.image}
              sx={{ width: 64, height: 64, bgcolor: '#fbff2d' }}
            />
          }
          title={`${formData.firstName} ${formData.lastName}`}
          subheader={`Role: ${formData.role}`}
          action={
            isEditMode ? (
              <>
                <IconButton onClick={handleSave} color="success">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel} color="error">
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={() => setIsEditMode(true)} color="primary">
                <EditIcon />
              </IconButton>
            )
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="First name"
                fullWidth
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Last name"
                fullWidth
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Date of birth"
                type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                value={parseDate(formData.birthDate)}
                onChange={(e) => handleChange('birthDate', e.target.value)}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={12}>
              <Typography variant="h6" gutterBottom>
                Адрес
              </Typography>
            </Grid>
            <Grid size={12}>
              <TextField
                label="Address"
                fullWidth
                value={formData.address.address}
                onChange={(e) =>
                  handleChange('address.address', e.target.value)
                }
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="City"
                fullWidth
                value={formData.address.city}
                onChange={(e) => handleChange('address.city', e.target.value)}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="State"
                fullWidth
                value={formData.address.state}
                onChange={(e) => handleChange('address.state', e.target.value)}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Postal code"
                fullWidth
                value={formData.address.postalCode}
                onChange={(e) =>
                  handleChange('address.postalCode', e.target.value)
                }
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Country"
                fullWidth
                value={formData.address.country}
                onChange={(e) =>
                  handleChange('address.country', e.target.value)
                }
                disabled={!isEditMode}
              />
            </Grid>

            {isEditMode && (
              <Grid size={12}>
                <label htmlFor="avatar-upload">
                  <Input
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}>
                    Upload avatar
                  </Button>
                </label>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      {user?.role === 'admin' && (
        <Button
          variant="contained"
          color="warning"
          role="link"
          href={AppRoutes.Admin}>
          Admin
        </Button>
      )}
    </Box>
  );
};

export default UserProfilePage;
