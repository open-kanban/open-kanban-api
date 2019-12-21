import faker from 'faker';
import { ColumnData } from '../../src/app/entities/column';

export const getFakeColumnData = (): ColumnData => ({
  id: faker.random.alphaNumeric(10),
  boardId: faker.random.alphaNumeric(10),
  name: faker.lorem.word(),
});

export const makeFakeColumn = () => ({
  getId: jest.fn(),
  getBoardId: jest.fn(),
  getName: jest.fn(),
});

export const getColumnModelMock = () => ({
  save: jest.fn(),
});
