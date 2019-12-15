export type AttachmentFactoryDependencies = {
  generateId: () => string;
};

export type AttachmentFactory = (attachmentData: AttachmentData) => Attachment;

type AttachmentType = 'image' | 'file';

export type AttachmentData = {
  id?: string;
  entityId: string;
  url: string;
  type: AttachmentType;
};

export type Attachment = {
  getId: () => string;
  getEntityId: () => string;
  getUrl: () => string;
  getType: () => AttachmentType;
};

export default function buildMakeAttachment({
  generateId,
}: AttachmentFactoryDependencies): AttachmentFactory {
  return function makeAttachment({
    id = generateId(),
    entityId,
    type,
    url,
  }: AttachmentData): Attachment {
    if (!entityId) throw new Error('Entity ID must be provided');
    if (!url) throw new Error('URL must be provided');

    return {
      getId: () => id,
      getEntityId: () => entityId,
      getType: () => type,
      getUrl: () => url,
    };
  };
}
