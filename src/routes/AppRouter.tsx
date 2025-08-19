import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import { AppRoutes } from '../enum/AppRoutes';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import PostPage from '../pages/PostPage';
import LoginPage from '../pages/LoginPage';
import AuthProvider from '../providers/AuthProvider';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Home} element={<Layout />}>
        <Route path={AppRoutes.Login} element={<LoginPage />} />

        <Route element={<AuthProvider />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoutes.Post} element={<PostPage />} />
          <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
