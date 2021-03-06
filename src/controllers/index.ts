import boardsController from './boards';
import cardsController from './cards';
import columnsController from './columns';
import loginController from './login';
import usersController from './users';

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
  cards: cardsController,
  columns: columnsController,
  boards: boardsController,
  login: loginController,
  users: usersController,
  notFound: async (): Promise<HttpResponse> => ({
    statusCode: 404,
    body: {
      error: 'Resource not found',
    },
  }),
};

export default controllers;
