import { getBoardsRepositoryMock, getFakeBoardData } from '../../../../__tests__/fixtures/board';
import { getFakeUserData, getUserRepositoryMock } from '../../../../__tests__/fixtures/user';
import buildMakeBoard, { BoardFactory } from './board';

describe('Board factory', () => {
  const validBoardData = getFakeBoardData();
  const validUserData = getFakeUserData();
  const boardFactoryDependencies = {
    generateId: jest.fn(),
    boardRepository: getBoardsRepositoryMock(),
    userRepository: getUserRepositoryMock(),
  };
  let makeBoard: BoardFactory;

  beforeEach(() => {
    boardFactoryDependencies.generateId.mockReturnValue('123');
    boardFactoryDependencies.userRepository.findById.mockResolvedValue(validUserData);
    boardFactoryDependencies.boardRepository.findById.mockResolvedValue(null);
    makeBoard = buildMakeBoard(boardFactoryDependencies);
  });

  describe('data validation', () => {
    it('throws if user id is not provided', async () => {
      const board = await makeBoard();
      await expect(board.setUserId('')).rejects.toThrow('User ID must be provided');
    });

    it('throws if provided user does not exist', async () => {
      boardFactoryDependencies.userRepository.findById.mockResolvedValue(null);
      const board = await makeBoard();
      await expect(board.setUserId('invalid')).rejects.toThrow('User does not exist');
      expect(boardFactoryDependencies.userRepository.findById).toBeCalledWith('invalid');
    });

    it('throws if name is not provided', async () => {
      const board = await makeBoard();
      expect(() => board.setName('')).toThrow('Name must be provided');
    });

    it('does not check if user exists if given user is the same as current one', async () => {
      const board = await makeBoard();
      await board.setUserId('userId');
      jest.clearAllMocks();
      await board.setUserId('userId');
      expect(boardFactoryDependencies.userRepository.findById).not.toBeCalled();
    });

    it('throws if one of provided invited user does not exist', async () => {
      boardFactoryDependencies.userRepository.findById
        .mockResolvedValueOnce(validUserData)
        .mockResolvedValue(null);

      const board = await makeBoard();

      await expect(board.setInvitedUsersIds(['valid', 'invalid'])).rejects.toThrow(
        'User with ID "invalid" does not exist'
      );
    });

    it('does not check if invited user exists if it is included in the current invited users list', async () => {
      boardFactoryDependencies.userRepository.findById.mockResolvedValue(validUserData);
      const board = await makeBoard();
      await board.setInvitedUsersIds(['valid1', 'valid2']);
      jest.clearAllMocks();
      await board.setInvitedUsersIds(['valid1', 'valid2']);
      expect(boardFactoryDependencies.userRepository.findById).not.toBeCalled();
    });
  });

  describe('data retrieval', () => {
    it('has the given user ID', async () => {
      const board = await makeBoard();
      await board.setUserId('123');
      expect(board.getUserId()).toEqual('123');
    });

    it('has the given invited users ids', async () => {
      const board = await makeBoard();
      await board.setInvitedUsersIds(['1', '2']);
      expect(board.getInvitedUsersIds()).toEqual(['1', '2']);
    });

    it('has the given name', async () => {
      const board = await makeBoard();
      board.setName('name');
      expect(board.getName()).toEqual('name');
    });

    it('has a generated hash ID', async () => {
      boardFactoryDependencies.generateId.mockReturnValue('hash');
      const board = await makeBoard();
      expect(board.getHash()).toEqual('hash');
    });
  });

  describe('data retrieval when board ID is provided', () => {
    beforeEach(() => {
      boardFactoryDependencies.boardRepository.findById.mockResolvedValue(validBoardData);
    });

    it('finds the board data', async () => {
      await makeBoard('boardId');
      expect(boardFactoryDependencies.boardRepository.findById).toBeCalledWith('boardId');
    });

    it('rejects if board was not found', async () => {
      boardFactoryDependencies.boardRepository.findById.mockResolvedValue(null);
      await expect(makeBoard('boardId')).rejects.toThrow('Board not found');
    });

    it('populates the board user ID from the found board', async () => {
      const board = await makeBoard('boardId');
      expect(board.getUserId()).toEqual(validBoardData.userId);
    });

    it('populates the board invited users IDs from the found board', async () => {
      boardFactoryDependencies.boardRepository.findById.mockResolvedValue({
        ...validBoardData,
        invitedUsersIds: ['random'],
      });
      const board = await makeBoard('boardId');
      expect(board.getInvitedUsersIds()).toEqual(['random']);
    });

    it('populates the board name from the found board', async () => {
      const board = await makeBoard('boardId');
      expect(board.getName()).toEqual(validBoardData.name);
    });

    it('populates the board hash from the found board', async () => {
      const board = await makeBoard('boardId');
      expect(board.getHash()).toEqual(validBoardData.hash);
    });
  });
});
