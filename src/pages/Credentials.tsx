import React from 'react';
import { Link } from 'react-router-dom';
import MonacoEditor from '../components/MonacoEditor';

const HOSTNAME = window.location.hostname;
const ACCESS_TOKEN = `${HOSTNAME}_access_token`;
const REFRESH_TOKEN = `${HOSTNAME}_refresh_token`;

const Credentials = () => {
  const credentials = {
    access_token: localStorage.getItem(ACCESS_TOKEN),
    refresh_token: localStorage.getItem(REFRESH_TOKEN),
  };

  return (
    <>
      <Link to={'/public'}>Go to Publiic page</Link>
      <span>
        <h2>🔑 Credentials</h2>
      </span>
      <MonacoEditor
        height="40vh"
        language="json"
        value={JSON.stringify(credentials, null, 2)}
      />
    </>
  );
};

export default Credentials;
