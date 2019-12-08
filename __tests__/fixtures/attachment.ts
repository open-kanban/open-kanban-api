import faker from 'faker';
import { AttachmentData } from '../../src/entities/attachment';

export const getFakeAttachmentData = (): AttachmentData => ({
  id: faker.random.alphaNumeric(10),
  entityId: faker.random.alphaNumeric(10),
  type: 'image',
  url: faker.image.imageUrl(),
});
