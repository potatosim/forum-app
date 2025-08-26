import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './normalize.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<CircularProgress />}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
