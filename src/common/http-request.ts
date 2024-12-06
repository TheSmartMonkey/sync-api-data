import { HttpResponse } from '@/models/http.model';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function getRequest<TOUTPUT>(
  url: string,
  { headers, timeout = 20000 }: { headers?: AxiosRequestConfig['headers']; timeout?: number } = {},
): Promise<HttpResponse<TOUTPUT>> {
  const response: AxiosResponse<TOUTPUT> = await axios.get(url, getHeaders({ headers, timeout }));
  return { body: response.data, ...response };
}

export async function postRequest<TDATA, TOUTPUT>(
  url: string,
  data: TDATA,
  { headers, timeout = 20000 }: { headers?: AxiosRequestConfig['headers']; timeout?: number } = {},
): Promise<HttpResponse<TOUTPUT>> {
  const response: AxiosResponse<TOUTPUT> = await axios.post(url, data, getHeaders({ headers, timeout }));
  return { body: response.data, ...response };
}

export async function putRequest<TDATA, TOUTPUT>(
  url: string,
  dataToUpdate: TDATA,
  { headers, timeout = 20000 }: { headers?: AxiosRequestConfig['headers']; timeout?: number } = {},
): Promise<HttpResponse<TOUTPUT>> {
  const response: AxiosResponse<TOUTPUT> = await axios.put(url, dataToUpdate, getHeaders({ headers, timeout }));
  return { body: response.data, ...response };
}

export async function deleteRequest<TOUTPUT>(
  url: string,
  { headers, timeout = 20000 }: { headers?: AxiosRequestConfig['headers']; timeout?: number } = {},
): Promise<HttpResponse<TOUTPUT>> {
  const response: AxiosResponse<TOUTPUT> = await axios.delete(url, getHeaders({ headers, timeout }));
  return { body: response.data, ...response };
}

function getHeaders({ headers, timeout = 20000 }: { headers?: AxiosRequestConfig['headers']; timeout?: number }): AxiosRequestConfig {
  return {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    timeout,
  };
}
