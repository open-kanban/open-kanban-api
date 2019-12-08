import faker from 'faker';
import { BoardData } from '../../src/board/board';

export const getFakeBoardData = (): BoardData => ({
  id: faker.random.alphaNumeric(10),
  userId: faker.random.alphaNumeric(10),
  invitedUsersIds: [],
  name: faker.name.findName(),
});
