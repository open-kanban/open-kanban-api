import { HttpRequest, HttpResponse } from '..';
import { ShowUser } from '../../app/use-cases/users/show-user';

export type UsersGetControllerDependencies = {
  showUser: ShowUser;
};

export default function makeUsersGetController({ showUser }: UsersGetControllerDependencies) {
  return async function usersGetController({
    params,
    authData,
  }: HttpRequest): Promise<HttpResponse> {
    const { userId } = params;
    if (authData.userId !== userId) {
      return {
        statusCode: 403,
        body: {
          error: 'Not authorized',
        },
      };
    }

    try {
      const userData = await showUser(userId);

      return {
        statusCode: 200,
        body: { user: userData },
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
