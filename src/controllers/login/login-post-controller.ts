import jwt from 'jsonwebtoken';
import { Controller, HttpResponse } from '..';
import { LoginWithCredentials } from '../../app/use-cases/users/login-with-credentials';

export type LoginPostControllerDependencies = {
  loginWithCredentials: LoginWithCredentials;
};

export default function makeLoginPostController({
  loginWithCredentials,
}: LoginPostControllerDependencies): Controller {
  return async function loginPostController({ body }): Promise<HttpResponse> {
    const { email, password } = body;

    if (!email || !password)
      return {
        statusCode: 400,
        body: {
          error: 'Email and password must be provided',
        },
      };

    try {
      const sessionData = await loginWithCredentials({ email, password });
      const token = jwt.sign({ userId: sessionData.userId }, 'secret', {
        expiresIn: sessionData.sessionExpirationTime,
      });

      return {
        statusCode: 200,
        body: { token },
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: {
          error: error.message,
        },
      };
    }
  };
}
