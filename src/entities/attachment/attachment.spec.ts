import { getFakeAttachmentData } from '../../../__tests__/fixtures/attachment';
import buildMakeAttachment, { AttachmentFactory } from './attachment';

describe('Attachment factory', () => {
  const validAttachmentInfo = getFakeAttachmentData();
  const attachmentFactoryDependencies = {
    generateId: jest.fn(),
  };
  let makeAttachment: AttachmentFactory;

  beforeEach(() => {
    attachmentFactoryDependencies.generateId.mockReturnValue('123');
    makeAttachment = buildMakeAttachment(attachmentFactoryDependencies);
  });

  it('throws if an entity id is not provided', () => {
    expect(() => makeAttachment({ ...validAttachmentInfo, entityId: undefined })).toThrow(
      'Entity ID must be provided'
    );
  });

  it('throws if an url is not provided', () => {
    expect(() => makeAttachment({ ...validAttachmentInfo, url: undefined })).toThrow(
      'URL must be provided'
    );
  });

  it('generates an id', () => {
    attachmentFactoryDependencies.generateId.mockReturnValue('fakeId');
    const attachment = makeAttachment({ ...validAttachmentInfo, id: undefined });
    expect(attachment.getId()).toEqual('fakeId');
  });

  it('has the given id', () => {
    const attachment = makeAttachment({ ...validAttachmentInfo, id: 'id' });
    expect(attachment.getId()).toEqual('id');
  });

  it('has the given entity id', () => {
    const attachment = makeAttachment({ ...validAttachmentInfo, entityId: 'entityId' });
    expect(attachment.getEntityId()).toEqual('entityId');
  });

  it('has the given url', () => {
    const attachment = makeAttachment({ ...validAttachmentInfo, url: 'url' });
    expect(attachment.getUrl()).toEqual('url');
  });

  it('has the given type', () => {
    const attachment = makeAttachment({ ...validAttachmentInfo, type: 'image' });
    expect(attachment.getType()).toEqual('image');
  });
});
