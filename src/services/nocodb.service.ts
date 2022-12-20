import axios from 'axios';
import authConfig from '../authConfig';
import { useAxiosConfig } from '../hooks/axiosConfig';
import { IClientiPaginate } from '../models/clienti';
import { INocoDBUser } from '../models/user';
import Storage from '../storage/Storage';

const BASE_URL = `${authConfig.serviceUrl}/api/v1/db/data/v1/IAD CRM`;
const AUTH_URL = `${authConfig.serviceUrl}/api/v1/auth/user/signin`;

export function useNocodbApi() {
  const { axiosInstance } = useAxiosConfig();

  async function getToken(): Promise<{ token: string }> {
    const user: INocoDBUser = {
      email: process.env.REACT_APP_NOCODB_EMAIL || '',
      password: process.env.REACT_APP_NOCODB_PWD || '',
    };
    return await axios
      .post(AUTH_URL, user)
      .then(res => {
        Storage.setToken(res.data.token);
        return res.data;
      })
      .catch(err => {
        console.log(`Error on getToken ${err}`);
        return { token: '' };
      });
  }
  async function getCustomers(): Promise<IClientiPaginate> {
    return (await axiosInstance.get(`${BASE_URL}/Clienti`)).data;
  }

  async function getWorkForce(rowId: number) {
    return (await axiosInstance.get(`${BASE_URL}/Workforce/${rowId}`)).data;
  }

  async function getCustomerRef(rowId: number) {
    return (await axiosInstance.get(`${BASE_URL}/ReferentiCliente/${rowId}`))
      .data;
  }

  return { getToken, getCustomers, getWorkForce, getCustomerRef };
}
