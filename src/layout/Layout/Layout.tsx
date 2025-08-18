import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Main from '../Main';
import styled from '@emotion/styled';

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;
const Layout = () => {
  return (
    <LayoutWrapper>
      <ContentWrapper>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
