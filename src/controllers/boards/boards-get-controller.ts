import { HttpRequest, HttpResponse } from '..';
import { ListBoards } from '../../app/use-cases/boards/list-boards';

export type BoardsGetControllerDependencies = {
  listBoards: ListBoards;
};

export default function makeBoardsGetController({ listBoards }: BoardsGetControllerDependencies) {
  return async function boardsGetController({ query, params, authData }: HttpRequest): Promise<HttpResponse> {
    const { userId } = params;
    if (userId !== authData.userId) {
      return { statusCode: 403, body: { error: 'Not authorized' } };
    }

    let quantity, page;
    if (query.quantity) {
      quantity = +query.quantity;
    }
    if (query.page) {
      page = +query.page;
    }

    try {
      const boardsList = await listBoards({ userId, page, quantity });
      return {
        statusCode: 201,
        body: boardsList,
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
