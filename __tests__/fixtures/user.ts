import faker from 'faker';
import { UserData } from '../../src/app/entities/user';

export const getFakeUserData = (): UserData => ({
  id: faker.random.alphaNumeric(10),
  name: faker.lorem.word(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  avatar: faker.internet.avatar(),
});

export const makeFakeUser = () => ({
  getId: jest.fn(),
  getName: jest.fn(),
  getEmail: jest.fn(),
  getPassword: jest.fn(),
  getAvatar: jest.fn(),
  getSessionExpirationTime: jest.fn(),
});

export const getUserModelMock = () => ({
  findByEmail: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
});
