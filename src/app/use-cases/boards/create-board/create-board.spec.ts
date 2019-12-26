import {
  getBoardsRepositoryMock,
  getFakeBoardData,
  makeFakeBoard,
} from '../../../../../__tests__/fixtures/board';
import makeCreateBoard, { CreateBoard } from './create-board';

describe('Create board', () => {
  const rawBoardData = { name: 'name', userId: 'userId' };
  const validBoardData = getFakeBoardData();
  const createBoardsDependencies = {
    boardRepository: getBoardsRepositoryMock(),
    makeBoard: jest.fn(),
  };
  let createBoard: CreateBoard;
  const fakeBoard = makeFakeBoard();

  beforeEach(() => {
    jest.clearAllMocks();

    fakeBoard.getUserId.mockReturnValue('validUserId');
    fakeBoard.getInvitedUsersIds.mockReturnValue('validInvitedUsersIds');
    fakeBoard.getName.mockReturnValue('validName');
    fakeBoard.getHash.mockReturnValue('validHash');

    createBoardsDependencies.boardRepository.save.mockResolvedValue(validBoardData);
    createBoardsDependencies.makeBoard.mockReturnValue(fakeBoard);

    createBoard = makeCreateBoard(createBoardsDependencies);
  });

  it('creates a board entity and sets its data', async () => {
    await createBoard(rawBoardData);
    expect(createBoardsDependencies.makeBoard).toBeCalledWith();
    expect(fakeBoard.setName).toBeCalledWith('name');
    expect(fakeBoard.setUserId).toBeCalledWith('userId');
  });

  it('inserts the validated board data in the database', async () => {
    await createBoard(validBoardData);
    expect(createBoardsDependencies.boardRepository.save).toHaveBeenCalledWith({
      userId: 'validUserId',
      invitedUsersIds: 'validInvitedUsersIds',
      name: 'validName',
      hash: 'validHash',
    });
  });

  it('resolves with the created board data if board was successfully created', async () => {
    createBoardsDependencies.boardRepository.save.mockResolvedValue('created board data');
    await expect(createBoard(validBoardData)).resolves.toEqual('created board data');
  });
});
