import { getBoardsModelMock } from '../../../../../__tests__/fixtures/board';
import makeListBoards, { ListBoards } from './list-boards';

describe('List boards', () => {
  const createBoardsArray = (count: number) =>
    [...Array(count).keys()].map(index => ({ data: `data${index + 1}` }));
  const listBoardsDependencies = {
    boardsModel: getBoardsModelMock(),
  };
  let listBoards: ListBoards;

  beforeEach(() => {
    jest.clearAllMocks();
    listBoards = makeListBoards(listBoardsDependencies);

    listBoardsDependencies.boardsModel.get.mockResolvedValue(createBoardsArray(20));
    listBoardsDependencies.boardsModel.count.mockResolvedValue(20);
  });

  it('throws if given user id is empty', async () => {
    const result = listBoards({ userId: '' });
    await expect(result).rejects.toThrow('User ID must be provided');
  });

  it('gets the data list from the given user', async () => {
    await listBoards({ userId: 'userId' });
    expect(listBoardsDependencies.boardsModel.get).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'userId' })
    );
  });

  it('gets the data list with limit set to 10 if quantity is not provided', async () => {
    await listBoards({ userId: 'userId' });
    expect(listBoardsDependencies.boardsModel.get).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 10 })
    );
  });

  it('gets the data list with limit set to 20 if provided quantity is 20', async () => {
    await listBoards({ userId: 'userId', quantity: 20 });
    expect(listBoardsDependencies.boardsModel.get).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 20 })
    );
  });

  it('gets the data list with offset set to 0 if page is not provided', async () => {
    await listBoards({ userId: 'userId' });
    expect(listBoardsDependencies.boardsModel.get).toHaveBeenCalledWith(
      expect.objectContaining({ offset: 0 })
    );
  });

  it('gets the data list with offset set to 10 if provided page is 2 and quantity is not provided', async () => {
    await listBoards({ userId: 'userId', page: 2 });
    expect(listBoardsDependencies.boardsModel.get).toHaveBeenCalledWith(
      expect.objectContaining({ offset: 10 })
    );
  });

  it('gets the data list with offset set to 8 if provided page is 3 and quantity is 4', async () => {
    await listBoards({ userId: 'userId', page: 3, quantity: 4 });
    expect(listBoardsDependencies.boardsModel.get).toHaveBeenCalledWith(
      expect.objectContaining({ offset: 8 })
    );
  });

  it('resolves with the boards data list', async () => {
    const result = listBoards({ userId: 'userId' });

    await expect(result).resolves.toMatchObject({
      boards: expect.arrayContaining([{ data: 'data1' }]),
    });
  });

  it('resolves with the total number of boards', async () => {
    const result = listBoards({ userId: 'userId' });
    await expect(result).resolves.toMatchObject({ total: 20 });
    expect(listBoardsDependencies.boardsModel.count).toHaveBeenCalledWith({ userId: 'userId' });
  });

  it('resolves with the boards next page number', async () => {
    const result = listBoards({ userId: 'userId' });
    await expect(result).resolves.toMatchObject({ nextPage: 2 });
  });

  it('resolves with the boards next page as null if there are no more pages next', async () => {
    listBoardsDependencies.boardsModel.count.mockResolvedValue(20);
    const result = listBoards({ userId: 'userId', page: 2, quantity: 10 });
    await expect(result).resolves.toMatchObject({ nextPage: null });
  });
});
