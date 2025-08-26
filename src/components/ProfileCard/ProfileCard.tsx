import { useState, type ChangeEvent } from 'react';
import {
  Avatar,
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
import { updateUser } from '../../services/updateUser.mutation';

const Input = styled('input')({
  display: 'none',
});

const parseDate = (date: string) => {
  const [year, month, day] = date.split('-');

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

interface IProfileCardProps {
  user: IUserDto;
  editable: boolean;
  onSubmit?: (user: IUserDto) => void;
}

const ProfileCard = ({ user, onSubmit, editable }: IProfileCardProps) => {
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
    if (user) {
      updateUser({
        id: user?.id,
        dto: formData,
        onError: (err) => {
          console.log(err.message);
        },
        onSuccess: (updatedUser) => {
          onSubmit?.(updatedUser);
          setIsEditMode(false);
        },
      });
    }
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

  const getCardActions = () => {
    if (!editable) {
      return null;
    }

    return isEditMode ? (
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
    );
  };

  return (
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
        action={getCardActions()}
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
              Address
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Address"
              fullWidth
              value={formData.address.address}
              onChange={(e) => handleChange('address.address', e.target.value)}
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
              onChange={(e) => handleChange('address.country', e.target.value)}
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
  );
};

export default ProfileCard;
