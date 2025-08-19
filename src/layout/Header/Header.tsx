import styled from '@emotion/styled';
import { AppRoutes } from '../../enum/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { OtherHouses } from '@mui/icons-material';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem 2rem;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <IconButton
        aria-label="home"
        onClick={() => navigate(AppRoutes.Home)}
        size="large">
        <OtherHouses color="action" />
      </IconButton>
    </StyledHeader>
  );
};

export default Header;
