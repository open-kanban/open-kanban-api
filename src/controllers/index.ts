import columnsController from './columns';

export type Controller = (httpRequest: HttpRequest) => Promise<HttpResponse>;

export type HttpRequest = {
  body: Record<string, string | undefined>;
  query: Record<string, string | undefined>;
  params: Record<string, string>;
  ip: string;
  method: string;
  path: string;
  headers: {
    'Content-Type'?: string;
    referer?: string;
    'User-Agent'?: string;
  };
  authData: Record<string, any>;
};

export type HttpResponse = {
  statusCode: number;
  headers?: Record<string, any>;
  body?: Record<string, any>;
};

const controllers = {
  columns: columnsController,
};

export default controllers;
