export type CommentFactoryDependencies = {
  generateId: () => string;
  getCurrentDate: () => number;
};

export type CommentFactory = (commentData: CommentData) => Comment;

export type CommentData = {
  readonly id?: string;
  readonly entityId: string;
  readonly authorId: string;
  readonly authorName: string;
  readonly text: string;
  readonly createdAt?: number;
  readonly modifiedAt?: number;
  readonly deletedAt?: number;
};

export type Comment = {
  readonly getId: () => string;
  readonly getEntityId: () => string;
  readonly getAuthorId: () => string;
  readonly getAuthorName: () => string;
  readonly getText: () => string;
  readonly getCreatedAt: () => number;
  readonly getModifiedAt: () => number;
  readonly getDeletedAt: () => number;
  readonly delete: () => void;
  readonly restore: () => void;
};

export default function buildMakeComment({
  generateId,
  getCurrentDate,
}: CommentFactoryDependencies): CommentFactory {
  return function makeComment({
    id = generateId(),
    entityId,
    authorId,
    authorName,
    text,
    createdAt = getCurrentDate(),
    modifiedAt = getCurrentDate(),
    deletedAt,
  }): Comment {
    if (!entityId) throw new Error('Entity ID must be provided');
    if (!authorId) throw new Error('Author ID must be provided');
    if (!authorName) throw new Error('Author name must be provided');
    if (!text) throw new Error('Text must be provided');

    return {
      getId: () => id,
      getEntityId: () => entityId,
      getAuthorId: () => authorId,
      getAuthorName: () => authorName,
      getText: () => text,
      getCreatedAt: () => createdAt,
      getModifiedAt: () => modifiedAt,
      getDeletedAt: () => deletedAt,
      delete: () => {
        deletedAt = getCurrentDate();
      },
      restore: () => {
        deletedAt = null;
      },
    };
  };
}
