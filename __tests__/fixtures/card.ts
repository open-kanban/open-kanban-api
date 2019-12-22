import faker from 'faker';
import { CardData } from '../../src/app/entities/card';

export const getFakeCardData = (): CardData => ({
  id: faker.random.alphaNumeric(10),
  columnId: faker.random.alphaNumeric(10),
  name: faker.lorem.word(),
  description: faker.lorem.paragraph(),
});

export const makeFakeCard = () => ({
  getId: jest.fn(),
  getColumnId: jest.fn(),
  getName: jest.fn(),
  getDescription: jest.fn(),
});

export const getCardModelMock = () => ({
  findById: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});
