import axios, { AxiosInstance } from 'axios';
import { useMemo } from 'react';
import Storage from '../storage/Storage';

export function useAxiosConfig() {
  const nocodbToken = Storage.getToken();

  const axiosInstance: AxiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
        timeout: 1000,
        headers: {
          'accept-encoding': '*',
          authority:
            process.env.REACT_APP_SERVER_URL || 'https://nocodb.iad2.cloud',
          scheme: 'https',
          'xc-auth': nocodbToken || '',
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nocodbToken]
  );

  return { axiosInstance };
}
