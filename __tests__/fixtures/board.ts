import faker from 'faker';
import { BoardData } from '../../src/app/entities/board';

export const getFakeBoardData = (): BoardData => ({
  id: faker.random.alphaNumeric(10),
  userId: faker.random.alphaNumeric(10),
  invitedUsersIds: [],
  name: faker.name.findName(),
  hash: faker.random.alphaNumeric(10),
});

export const makeFakeBoard = () => ({
  setUserId: jest.fn(),
  setInvitedUsersIds: jest.fn(),
  setName: jest.fn(),
  getUserId: jest.fn(),
  getInvitedUsersIds: jest.fn(),
  getName: jest.fn(),
  getHash: jest.fn(),
});

export const getBoardsRepositoryMock = () => ({
  get: jest.fn(),
  count: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
});
