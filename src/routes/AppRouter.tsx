import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { AppRoutes } from '../enum/AppRoutes';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import PostPage from '../pages/PostPage';
import LoginPage from '../pages/LoginPage';
import AuthProvider from '../providers/AuthProvider';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/getCurrentUser.query';
import { CircularProgress } from '@mui/material';
import { useAuthContext } from '../providers/AuthProvider/hooks';
import ProfilePage from '../pages/ProfilePage';
import CreatePostPage from '../pages/CreatePostPage';
import AdminPage from '../pages/AdminPage';

const AuthRequired = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser({
      onSuccess: (currentUser) => {
        setUser(currentUser);
        setIsLoading(false);
      },
      onError: () => {
        navigate(AppRoutes.Login);
      },
    });
  }, []);

  if (isLoading && !user) {
    return <CircularProgress />;
  }

  return <Outlet />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AuthProvider />}>
        <Route path={AppRoutes.Home} element={<Layout />}>
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route path={AppRoutes.NotFoundPage} element={<NotFoundPage />} />
          <Route element={<AuthRequired />}>
            <Route index element={<MainPage />} />
            <Route path={AppRoutes.Post} element={<PostPage />} />
            <Route path={AppRoutes.Profile} element={<ProfilePage />} />
            <Route path={AppRoutes.CreatePost} element={<CreatePostPage />} />
            <Route path={AppRoutes.Admin} element={<AdminPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
