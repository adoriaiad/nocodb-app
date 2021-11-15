import AuthenticationProvider, {
  AuthenticationOptions,
  AutoLogin,
  LogginIn,
} from '@iad-os/react-ghost-auth';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import GhostAppBar from './components/GhostAppBar';
import ColorModeProvider from './contexts/ColorMode';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import PublicRoutes from './Routes/PublicRoutes';

const defaultAuthOpts: AuthenticationOptions = {
  authorization_endpoint:
    'https://login.iad2.eu/auth/realms/iad-developers/protocol/openid-connect/auth',
  token_endpoint:
    'https://login.iad2.eu/auth/realms/iad-developers/protocol/openid-connect/token',
  client_id: 'react-ghost-oidc',
  requested_scopes: 'openid',
  redirect_uri: 'http://localhost:3001/protected',
  end_session_endpoint:
    'https://login.iad2.eu/auth/realms/iad-developers/protocol/openid-connect/logout',
  realm: 'iad-developers',
  serviceUrl: '',
  redirect_logout_uri: 'http://localhost:3001',
};

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ColorModeProvider>
      <AuthenticationProvider options={defaultAuthOpts} axios={axios}>
        <GhostAppBar />
        <Routes>
          <Route path="/protected/*" element={<ProtectedRoutes />} />
          <Route path="/public/*" element={<PublicRoutes />} />
          <Route path="/" element={<Navigate to="/public" />} />
          <Route path="/*" element={<h2>⚠ OOPS... Page not found! ⚠</h2>} />
        </Routes>
        <LogginIn>
          <h2>🔄 Loading...</h2>
        </LogginIn>
        <AutoLogin />
      </AuthenticationProvider>
    </ColorModeProvider>
  );
}

export default App;
