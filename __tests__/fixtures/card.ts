import faker from 'faker';
import { CardData } from '../../src/card';

export const getFakeCardData = (): CardData => ({
  id: faker.random.alphaNumeric(10),
  columnId: faker.random.alphaNumeric(10),
  name: faker.lorem.word(),
  description: faker.lorem.paragraph(),
});
