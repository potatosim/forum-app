import { Box, Button } from '@mui/material';

import { useAuthContext } from '../../providers/AuthProvider/hooks';
import { AppRoutes } from '../../enum/AppRoutes';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

const UserProfilePage = () => {
  const { user, setUser } = useAuthContext();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: '1.5rem',
      }}>
      {user && <ProfileCard user={user} onSubmit={setUser} editable />}
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
