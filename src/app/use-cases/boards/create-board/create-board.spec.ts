import {
  getBoardsModelMock,
  getFakeBoardData,
  makeFakeBoard,
} from '../../../../../__tests__/fixtures/board';
import makeCreateBoard, { CreateBoard } from './create-board';

describe('Create board', () => {
  const validBoardData = getFakeBoardData();
  const createBoardsDependencies = {
    boardModel: getBoardsModelMock(),
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

    createBoardsDependencies.boardModel.findById.mockResolvedValue(null);
    createBoardsDependencies.boardModel.save.mockResolvedValue(validBoardData);
    createBoardsDependencies.makeBoard.mockReturnValue(fakeBoard);
    createBoard = makeCreateBoard(createBoardsDependencies);
  });

  it('inserts the validated board data in the database', async () => {
    await createBoard(validBoardData);
    await expect(createBoardsDependencies.boardModel.save).toHaveBeenCalledWith({
      id: 'validId',
      userId: 'validUserId',
      invitedUsersIds: 'validInvitedUsersIds',
      name: 'validName',
    });
  });

  it('resolves with the created board data if board was successfully created', async () => {
    createBoardsDependencies.boardModel.save.mockResolvedValue('created board data');
    await expect(createBoard(validBoardData)).resolves.toEqual('created board data');
  });

  it('rejects with error if board creation throws', async () => {
    createBoardsDependencies.makeBoard.mockImplementation(() => {
      throw new Error('Error');
    });
    await expect(createBoard(validBoardData)).rejects.toThrow('Error');
  });

  it('rejects with error if board insertion throws', async () => {
    createBoardsDependencies.boardModel.save.mockRejectedValue('Error');
    await expect(createBoard(validBoardData)).rejects.toEqual('Error');
  });
});
