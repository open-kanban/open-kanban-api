import faker from 'faker';
import { UserData } from '../../src/app/entities/user';

export const getFakeUserData = (): UserData => ({
  id: faker.random.alphaNumeric(10),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  avatar: faker.internet.avatar(),
});

export const makeFakeUser = () => ({
  setName: jest.fn(),
  setEmail: jest.fn(),
  setPassword: jest.fn(),
  setAvatar: jest.fn(),
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
  isAuthorizedToModifyColumn: jest.fn(),
});

export const getUserRepositoryMock = () => ({
  findByEmail: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  findFullDataById: jest.fn(),
});
