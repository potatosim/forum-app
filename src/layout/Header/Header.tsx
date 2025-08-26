import styled from '@emotion/styled';
import { AppRoutes } from '../../enum/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { OtherHouses } from '@mui/icons-material';
import UserMenu from '../../components/UserMenu';
import { useAuthContext } from '../../providers/AuthProvider/hooks';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem 2rem;
`;

const Header = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <Tooltip title="Main page">
        <IconButton
          aria-label="home"
          onClick={() => navigate(AppRoutes.Home)}
          size="large">
          <OtherHouses color="warning" />
        </IconButton>
      </Tooltip>
      {user && <UserMenu />}
    </StyledHeader>
  );
};

export default Header;
