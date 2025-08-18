import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import { AppRoutes } from '../enum/AppRoutes';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Home} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
