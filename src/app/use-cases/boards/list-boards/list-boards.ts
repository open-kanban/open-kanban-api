import { BoardModel } from '..';
import { BoardData } from '../../../entities/board';

export type ListBoardDependencies = {
  boardsModel: BoardModel;
};

type ListBoardsOptions = {
  userId: string;
  page?: number;
  quantity?: number;
};

export type ListBoards = (
  options: ListBoardsOptions
) => Promise<{
  boards: BoardData[];
  nextPage: number | null;
  total: number;
}>;

export default function makeListBoards({ boardsModel }: ListBoardDependencies): ListBoards {
  return async function listBoards({ userId, quantity = 10, page = 1 }: ListBoardsOptions) {
    if (!userId) throw new Error('User ID must be provided');

    const offset = (page - 1) * quantity;
    const boards = await boardsModel.get({ userId, limit: quantity, offset });
    const boardsCount = await boardsModel.count({ userId });
    const nextPage = page * quantity < boardsCount ? page + 1 : null;

    return { boards, total: boardsCount, nextPage };
  };
}
