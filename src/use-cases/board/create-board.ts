import { BoardData, BoardFactory } from '../../entities/board';

export type CreateBoardDependencies = {
  boardDatabase: {
    findById: (boardId: string) => Promise<BoardData | null>;
    insert: (boardData: Required<BoardData>) => Promise<BoardData>;
  };
  makeBoard: BoardFactory;
};

export type CreateBoard = (boardData: BoardData) => Promise<BoardData>;

export default function makeCreateBoard({
  boardDatabase,
  makeBoard,
}: CreateBoardDependencies): CreateBoard {
  return async function createBoard(boardData): Promise<BoardData> {
    const board = makeBoard(boardData);
    const existingBoard = await boardDatabase.findById(board.getId());
    if (existingBoard) return existingBoard;

    return boardDatabase.insert({
      id: board.getId(),
      userId: board.getUserId(),
      invitedUsersIds: board.getInvitedUsersIds(),
      name: board.getName(),
    });
  };
}
