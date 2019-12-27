import { HttpRequest, HttpResponse } from '..';
import { ListBoards } from '../../app/use-cases/boards/list-boards';

export type BoardsGetControllerDependencies = {
  listBoards: ListBoards;
};

export default function makeBoardsGetController({ listBoards }: BoardsGetControllerDependencies) {
  return async function boardsGetController({
    params,
    authData,
  }: HttpRequest): Promise<HttpResponse> {
    const { userId } = params;
    if (userId !== authData.userId) {
      return { statusCode: 403, body: { error: 'Not authorized' } };
    }

    try {
      const boards = await listBoards(userId);
      return {
        statusCode: 201,
        body: { boards },
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          error,
        },
      };
    }
  };
}
