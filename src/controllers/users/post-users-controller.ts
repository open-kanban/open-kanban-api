import { Controller } from '..';
import { UserData } from '../../app/entities/user';
import { CreateAccount } from '../../app/use-cases/users/create-account';

export type PostUsersControllerDependencies = {
  createAccount: CreateAccount;
};

export default function makePostUsers({
  createAccount,
}: PostUsersControllerDependencies): Controller {
  return async function postUsers({ body }) {
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
