import { BoardData, BoardFactory, BoardRepository } from '../../../entities/board';

export type CreateBoardDependencies = {
  boardRepository: BoardRepository;
  makeBoard: BoardFactory;
};

export type CreateBoard = (boardData: { userId: string; name: string }) => Promise<BoardData>;

export default function makeCreateBoard({
  boardRepository,
  makeBoard,
}: CreateBoardDependencies): CreateBoard {
  return async function createBoard({ name, userId }): Promise<BoardData> {
    const board = await makeBoard();
    board.setName(name);
    board.setUserId(userId);

    return boardRepository.save({
      userId: board.getUserId(),
      invitedUsersIds: board.getInvitedUsersIds(),
      name: board.getName(),
      hash: board.getHash(),
    });
  };
}
