import authConfig from '../authConfig';
import { axiosInstance } from '../axiosConfig';
import { IClientiPaginate } from '../models/clienti';

const BASE_URL = `${authConfig.serviceUrl}/api/v1/db/data/v1/IAD CRM`;
export async function getCustomers(): Promise<IClientiPaginate> {
  return await (
    await axiosInstance.get(`${BASE_URL}/Clienti`)
  ).data;
}
