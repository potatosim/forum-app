import { AppRoutes } from '../../enum/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
      }}>
      <Box>
        <img src="https://i.pinimg.com/736x/fe/4e/82/fe4e82e755122222288e340a5ff6b6ca.jpg" />
      </Box>
      <Typography variant="h4" color="warning" alignSelf="center">
        The page you are looking for can`t be found
      </Typography>
      <Box>
        <Button
          color="warning"
          size="large"
          variant="contained"
          onClick={() => navigate(AppRoutes.Home)}>
          Go back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
