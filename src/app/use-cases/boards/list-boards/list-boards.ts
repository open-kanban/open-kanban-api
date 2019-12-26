import { BoardData, BoardRepository } from '../../../entities/board';

export type ListBoardDependencies = {
  boardRepository: BoardRepository;
};

export type ListBoards = (userId: string) => Promise<BoardData[]>;

export default function makeListBoards({ boardRepository }: ListBoardDependencies): ListBoards {
  return async function listBoards(userId): Promise<BoardData[]> {
    if (!userId) throw new Error('User ID must be provided');
    return await boardRepository.get(userId);
  };
}
