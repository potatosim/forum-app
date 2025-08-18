import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './normalize.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { CircularProgress } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
