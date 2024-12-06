import { HttpStatusCode, Method } from 'axios';

export type HttpResponse<TBODY> = {
  status: HttpStatusCode;
  body: TBODY;
};

export type HttpMethod = Method;
