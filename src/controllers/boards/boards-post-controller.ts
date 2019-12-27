import { Controller, HttpResponse } from '..';
import { CreateBoard } from '../../app/use-cases/boards/create-board';

export type BoardsPostControllerDependencies = {
  createBoard: CreateBoard;
};

export default function makeBoardsPostController({
  createBoard,
}: BoardsPostControllerDependencies): Controller {
  return async function boardsPostController({ body, params, authData }): Promise<HttpResponse> {
    const { userId, name } = body;

    try {
      const board = await createBoard({ userId, name });
      return {
        statusCode: 201,
        body: { board },
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
