import faker from 'faker';
import { CommentData } from '../../src/entities/comment';

export const getFakeCommentData = (): CommentData => ({
  id: faker.random.alphaNumeric(10),
  entityId: faker.random.alphaNumeric(10),
  authorName: faker.name.findName(),
  authorId: faker.random.alphaNumeric(10),
  text: faker.lorem.paragraph(),
  createdAt: Date.now(),
  modifiedAt: Date.now(),
  deletedAt: Date.now(),
});
