import { type FC, type PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const MainWrapper = styled.main`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
`;

const Main: FC<PropsWithChildren> = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Main;
