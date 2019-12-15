import { BoardModel } from '..';
import { BoardData, BoardFactory } from '../../../entities/board';

export type CreateBoardDependencies = {
  boardModel: BoardModel;
  makeBoard: BoardFactory;
};

export type CreateBoard = (boardData: BoardData) => Promise<BoardData>;

export default function makeCreateBoard({
  boardModel,
  makeBoard,
}: CreateBoardDependencies): CreateBoard {
  return async function createBoard(boardData): Promise<BoardData> {
    const board = makeBoard(boardData);

    return boardModel.save({
      id: board.getId(),
      userId: board.getUserId(),
      invitedUsersIds: board.getInvitedUsersIds(),
      name: board.getName(),
    });
  };
}
