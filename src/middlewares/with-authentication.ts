import { RequestHandler, Response } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

export default function makeWithAuthentication(): RequestHandler {
  return async function withAuthentication(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      forbidRequest(res);
      return;
    }

    try {
      const token = authHeader.split(' ')[1];
      if (!token) {
        forbidRequest(res);
        return;
      }

      const verifiedToken = jwt.verify(token, 'secret') as Record<string, string>;
      res.locals.userId = verifiedToken.userId;
      next();
    } catch (error) {
      forbidRequest(res);
    }
  };
}

const forbidRequest = (res: Response) => {
  res.type('json');
  res.status(403);
  res.send({
    error: 'Not authorized',
  });
};
