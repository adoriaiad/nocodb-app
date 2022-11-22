import React, { lazy } from 'react';
import { RouteObject, useRoutes } from 'react-router';
import Loadable from '../core/Loadable';
import ProtectedLayout from '../layouts/ProtectedLayout';
import TeamList from '../pages/TeamList';

const UserInfo = Loadable(lazy(() => import('../pages/UserInfo')));
const Credentials = Loadable(lazy(() => import('../pages/Credentials')));

const ProtectedRouters: React.FC = () => {
  return useRoutes([routes]);
};

const routes: RouteObject = {
  element: <ProtectedLayout />,
  children: [
    {
      path: '/',
      element: <TeamList />,
    },
    {
      path: '/users',
      element: <UserInfo />,
    },
  ],
};

export default ProtectedRouters;
