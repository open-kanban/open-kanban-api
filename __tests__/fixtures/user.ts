import faker from 'faker';
import { UserData } from '../../src/entities/user';

export const getFakeUserData = (): UserData => ({
  id: faker.random.alphaNumeric(10),
  name: faker.lorem.word(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  avatar: faker.internet.avatar(),
});
