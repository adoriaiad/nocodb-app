import React, { lazy, useEffect } from 'react';
import { RouteObject, useRoutes } from 'react-router';
import Loadable from '../core/Loadable';
import ProtectedLayout from '../layouts/ProtectedLayout';
import ClientiList from '../pages/ClientiList';
import { useNocodbApi } from '../services/nocodb.service';

const UserInfo = Loadable(lazy(() => import('../pages/UserInfo')));
//const Credentials = Loadable(lazy(() => import('../pages/Credentials')));

const ProtectedRouters: React.FC = () => {
  const { getToken } = useNocodbApi();
  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useRoutes([routes]);
};

const routes: RouteObject = {
  element: <ProtectedLayout />,
  children: [
    {
      path: '/',
      element: <ClientiList />,
    },
    {
      path: '/users',
      element: <UserInfo />,
    },
  ],
};

export default ProtectedRouters;
