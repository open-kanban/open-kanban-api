import faker from 'faker';
import { ColumnData } from '../../src/entities/column';

export const getFakeColumnData = (): ColumnData => ({
  id: faker.random.alphaNumeric(10),
  boardId: faker.random.alphaNumeric(10),
  name: faker.lorem.word(),
});
