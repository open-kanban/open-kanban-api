import faker from 'faker';
import { BoardData } from '../../src/app/entities/board';

export const getFakeBoardData = (): BoardData => ({
  id: faker.random.alphaNumeric(10),
  userId: faker.random.alphaNumeric(10),
  invitedUsersIds: [],
  name: faker.name.findName(),
});

export const makeFakeBoard = () => ({
  getId: jest.fn(),
  getUserId: jest.fn(),
  getInvitedUsersIds: jest.fn(),
  getName: jest.fn(),
});

export const getBoardsModelMock = () => ({
  get: jest.fn(),
  count: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
});
