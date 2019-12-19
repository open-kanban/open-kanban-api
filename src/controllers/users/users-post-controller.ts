import { Controller, HttpResponse } from '..';
import { UserData } from '../../app/entities/user';
import { CreateAccount } from '../../app/use-cases/users/create-account';

export type UsersPostControllerDependencies = {
  createAccount: CreateAccount;
};

export default function makeUsersPostController({
  createAccount,
}: UsersPostControllerDependencies): Controller {
  return async function usersPostController({ body }): Promise<HttpResponse> {
    const userData = body as UserData;

    try {
      const user = await createAccount(userData);
      return {
        statusCode: 201,
        body: { user },
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          error: error.message,
        },
      };
    }
  };
}
