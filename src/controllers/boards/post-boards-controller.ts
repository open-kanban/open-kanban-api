import { Controller } from '..';
import { BoardData } from '../../app/entities/board';
import { CreateBoard } from '../../app/use-cases/boards/create-board';

export type PostBoardsControllerDependencies = {
  createBoard: CreateBoard;
};

export default function makePostBoards({
  createBoard,
}: PostBoardsControllerDependencies): Controller {
  return async function postBoards({ body, params, authData }) {
    const { userId } = params;
    if (userId !== authData.userId)
      return {
        statusCode: 403,
        body: { error: 'Not authorized' },
      };

    const boardData = body as BoardData;

    try {
      const board = await createBoard(boardData);
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
