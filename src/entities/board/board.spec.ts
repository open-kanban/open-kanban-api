import { getFakeBoardData } from '../../../__tests__/fixtures/board';
import buildMakeBoard, { BoardFactory } from './board';

describe('Board factory', () => {
  const validBoardData = getFakeBoardData();
  const boardFactoryDependencies = {
    generateId: jest.fn(),
  };
  let makeBoard: BoardFactory;

  beforeEach(() => {
    boardFactoryDependencies.generateId.mockReturnValue('123');
    makeBoard = buildMakeBoard(boardFactoryDependencies);
  });

  it('throws if user id is not provided', () => {
    expect(() => makeBoard({ ...validBoardData, userId: undefined })).toThrow('User ID must be provided');
  });

  it('throws if name is not provided', () => {
    expect(() => makeBoard({ ...validBoardData, name: undefined })).toThrow('Name must be provided');
  });

  it('generates an id', () => {
    boardFactoryDependencies.generateId.mockReturnValue('RandomID');
    const validBoard = makeBoard({ ...validBoardData, id: undefined });
    expect(validBoard.getId()).toEqual('RandomID');
  });

  it('has the given id', () => {
    const validBoard = makeBoard({ ...validBoardData, id: '123' });
    expect(validBoard.getId()).toEqual('123');
  });

  it('has the given user id', () => {
    const validBoard = makeBoard({ ...validBoardData, userId: '123' });
    expect(validBoard.getUserId()).toEqual('123');
  });

  it('has the given invited users ids', () => {
    const validBoard = makeBoard({ ...validBoardData, invitedUsersIds: ['1', '2'] });
    expect(validBoard.getInvitedUsersIds()).toEqual(['1', '2']);
  });

  it('has the given name', () => {
    const validBoard = makeBoard({ ...validBoardData, name: 'name' });
    expect(validBoard.getName()).toEqual('name');
  });
});
