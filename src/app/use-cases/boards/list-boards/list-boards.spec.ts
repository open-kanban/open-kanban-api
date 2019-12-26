import { getBoardsRepositoryMock } from '../../../../../__tests__/fixtures/board';
import makeListBoards, { ListBoards } from './list-boards';

describe('List boards', () => {
  const listBoardsDependencies = {
    boardRepository: getBoardsRepositoryMock(),
  };
  let listBoards: ListBoards;

  beforeEach(() => {
    jest.clearAllMocks();
    listBoards = makeListBoards(listBoardsDependencies);
    listBoardsDependencies.boardRepository.get.mockResolvedValue([]);
  });

  it('throws if given user id is empty', async () => {
    const result = listBoards('');
    await expect(result).rejects.toThrow('User ID must be provided');
  });

  it('gets the boards from the given user', async () => {
    await listBoards('userId');
    expect(listBoardsDependencies.boardRepository.get).toHaveBeenCalledWith('userId');
  });

  it('resolves with the boards list', async () => {
    listBoardsDependencies.boardRepository.get.mockResolvedValue(['board1', 'board2']);
    const result = listBoards('userId');

    await expect(result).resolves.toEqual(['board1', 'board2']);
  });
});
