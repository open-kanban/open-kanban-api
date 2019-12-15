import { RequestHandler } from 'express-serve-static-core';
import { Controller, HttpRequest } from '.';

export default function makeExpressCallback(controller: Controller): RequestHandler {
  return function expressCallback(req, res) {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      ip: req.ip,
      method: req.method,
      params: req.params,
      path: req.path,
      query: req.query,
      authData: res.locals,
    };

    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers) res.set(httpResponse.headers);
        res.type('json');
        res.status(httpResponse.statusCode);
        res.send(httpResponse.body);
      })
      .catch(() => res.status(500).send({ error: 'Internal server error' }));
  };
}
