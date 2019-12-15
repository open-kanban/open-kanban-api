import { BoardData } from '../../entities/board';

export type BoardModel = {
  get: (options: {
    userId: string;
    offset?: number;
    limit?: number;
  }) => Promise<Required<BoardData>[]>;
  count: (options: { userId: string }) => Promise<number>;
  findById: (boardId: string) => Promise<Required<BoardData> | null>;
  save: (boardData: Required<BoardData>) => Promise<Required<BoardData>>;
};
