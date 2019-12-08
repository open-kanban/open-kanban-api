import { getFakeBoardData, makeFakeBoard } from '../../../__tests__/fixtures/board';
import makeCreateBoard, { CreateBoard } from './create-board';

describe('Create board', () => {
  const validBoardData = getFakeBoardData();
  const createBoardDependencies = {
    boardDatabase: {
      findById: jest.fn(),
      insert: jest.fn(),
    },
    makeBoard: jest.fn(),
  };
  let createBoard: CreateBoard;
  let fakeBoard: ReturnType<typeof makeFakeBoard>;

  beforeEach(() => {
    jest.clearAllMocks();

    fakeBoard = makeFakeBoard();
    fakeBoard.getId.mockReturnValue('validId');
    fakeBoard.getUserId.mockReturnValue('validUserId');
    fakeBoard.getInvitedUsersIds.mockReturnValue('validInvitedUsersIds');
    fakeBoard.getName.mockReturnValue('validName');

    createBoardDependencies.boardDatabase.findById.mockResolvedValue(null);
    createBoardDependencies.boardDatabase.insert.mockResolvedValue(validBoardData);
    createBoardDependencies.makeBoard.mockReturnValue(fakeBoard);
    createBoard = makeCreateBoard(createBoardDependencies);
  });

  it('inserts the validated board data in the database', async () => {
    await createBoard(validBoardData);
    await expect(createBoardDependencies.boardDatabase.insert).toHaveBeenCalledWith({
      id: 'validId',
      userId: 'validUserId',
      invitedUsersIds: 'validInvitedUsersIds',
      name: 'validName',
    });
  });

  it('resolves with the created board data if board was successfully created', async () => {
    createBoardDependencies.boardDatabase.insert.mockResolvedValue('created board data');
    await expect(createBoard(validBoardData)).resolves.toEqual('created board data');
  });

  it('resolves with the found board data if board already exists', async () => {
    fakeBoard.getId.mockReturnValue('mockId');
    createBoardDependencies.boardDatabase.findById.mockResolvedValue('found data');
    await expect(createBoard(validBoardData)).resolves.toEqual('found data');
    await expect(createBoardDependencies.boardDatabase.findById).toHaveBeenCalledWith('mockId');
  });

  it('rejects with error if board creation throws', async () => {
    createBoardDependencies.makeBoard.mockImplementation(() => {
      throw new Error('Error');
    });
    await expect(createBoard(validBoardData)).rejects.toThrow('Error');
  });

  it('rejects with error if board insertion throws', async () => {
    createBoardDependencies.boardDatabase.insert.mockRejectedValue('Error');
    await expect(createBoard(validBoardData)).rejects.toEqual('Error');
  });
});
