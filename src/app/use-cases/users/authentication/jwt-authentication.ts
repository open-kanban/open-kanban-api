import jwt from 'jsonwebtoken';
import { Authentication } from '.';

export default function makeJWTAuthentication(token: string): Authentication {
  if (!token) throw new Error('Invalid token');

  return {
    authenticate: (): string => {
      try {
        const verifiedToken = jwt.verify(token, 'secret') as Record<string, string>;

        return verifiedToken.userId;
      } catch (error) {
        throw new Error('Not authorized');
      }
    },
  };
}
