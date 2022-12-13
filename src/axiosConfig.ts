import axios from 'axios';
import { INocoDBUser } from './models/user';
import { getToken } from './services/nocodb.service';
import Storage from './storage/Storage';

const user: INocoDBUser = {
  email: process.env.REACT_APP_EMAIL || '',
  password: process.env.REACT_APP_PWD || '',
};

export async function httpInterceptor() {
  await getToken(user)
    .then(res => {
      Storage.setToken(res.token);
    })
    .catch(err => console.log(`Error on Set Axios Config ${err}`));
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1000,
  headers: {
    'accept-encoding': '*',
    authority: process.env.REACT_APP_SERVER_URL || 'https://nocodb.iad2.cloud',
    scheme: 'https',
    'xc-auth': Storage.getToken() || '',
  },
});
