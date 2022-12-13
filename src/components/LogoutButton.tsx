import { useAuthentication } from '@iad-os/react-ghost-auth';
import React from 'react';
import Storage from './../storage/Storage';

const LogoutButton: React.FC = () => {
  const { logout } = useAuthentication();
  function cleanAndLogout() {
    Storage.cleanToken();
    logout();
  }
  return <button onClick={cleanAndLogout}>Logout</button>;
};

export default LogoutButton;
