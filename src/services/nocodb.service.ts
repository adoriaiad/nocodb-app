import axios from 'axios';
import authConfig from '../authConfig';
import { axiosInstance } from '../axiosConfig';
import { IClientiPaginate } from '../models/clienti';
import { INocoDBUser } from '../models/user';

const BASE_URL = `${authConfig.serviceUrl}/api/v1/db/data/v1/IAD CRM`;
const AUTH_URL = `${authConfig.serviceUrl}/api/v1/auth/user/signin`;

export async function getToken(user: INocoDBUser): Promise<{ token: string }> {
  return await axios
    .post(AUTH_URL, user)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(`Error on getToken ${err}`);
      return { token: '' };
    });
}
export async function getCustomers(): Promise<IClientiPaginate> {
  return (await axiosInstance.get(`${BASE_URL}/Clienti`)).data;
}
