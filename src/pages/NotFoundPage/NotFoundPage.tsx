import { AppRoutes } from '../../enum/AppRoutes';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 5%;
`;

const ImageWrapper = styled.div`
  max-width: 32rem;
`;

const NotFoundText = styled.p`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
`;

const GoBackButton = styled.button`
  text-decoration: none;
  font-size: 1.2rem;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  border-radius: 10px;
  transition: all 0.25s ease-in-out;
  background-color: #faf0cd;
  cursor: pointer;
`;
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <ImageWrapper>
        <img src="https://i.pinimg.com/736x/fe/4e/82/fe4e82e755122222288e340a5ff6b6ca.jpg" />
      </ImageWrapper>
      <NotFoundText>The page you are looking for can`t be found</NotFoundText>
      <div>
        <GoBackButton onClick={() => navigate(AppRoutes.Home)}>
          Go back to Home
        </GoBackButton>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
