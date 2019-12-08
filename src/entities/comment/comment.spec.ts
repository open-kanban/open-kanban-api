import { getFakeCommentData } from '../../../__tests__/fixtures/comment';
import buildMakeComment, { CommentFactory } from './comment';

describe('Comment factory', () => {
  const validCommentData = getFakeCommentData();
  const commentFactoryDependencies = {
    generateId: jest.fn(),
    getCurrentDate: jest.fn(),
  };
  let makeComment: CommentFactory;

  beforeEach(() => {
    commentFactoryDependencies.generateId.mockReturnValue('123');
    commentFactoryDependencies.getCurrentDate.mockReturnValue(Date.now());
    makeComment = buildMakeComment(commentFactoryDependencies);
  });

  it('throws if entity id is not provided', () => {
    expect(() => makeComment({ ...validCommentData, entityId: undefined })).toThrow(
      'Entity ID must be provided'
    );
  });

  it('throws if author id is not provided', () => {
    expect(() => makeComment({ ...validCommentData, authorId: undefined })).toThrow(
      'Author ID must be provided'
    );
  });

  it('throws if author name is not provided', () => {
    expect(() => makeComment({ ...validCommentData, authorName: undefined })).toThrow(
      'Author name must be provided'
    );
  });

  it('throws if text is not provided', () => {
    expect(() => makeComment({ ...validCommentData, text: undefined })).toThrow(
      'Text must be provided'
    );
  });

  it('generates an id', () => {
    commentFactoryDependencies.generateId.mockReturnValue('RandomID');
    const validComment = makeComment({ ...validCommentData, id: undefined });
    expect(validComment.getId()).toEqual('RandomID');
  });

  it('has the given id', () => {
    const validComment = makeComment({ ...validCommentData, id: '123' });
    expect(validComment.getId()).toEqual('123');
  });

  it('has the given entity id', () => {
    const validComment = makeComment({ ...validCommentData, entityId: 'entityId' });
    expect(validComment.getEntityId()).toEqual('entityId');
  });

  it('has the given author id', () => {
    const validComment = makeComment({ ...validCommentData, authorId: 'authorId' });
    expect(validComment.getAuthorId()).toEqual('authorId');
  });

  it('has the given author name', () => {
    const validComment = makeComment({ ...validCommentData, authorName: 'authorName' });
    expect(validComment.getAuthorName()).toEqual('authorName');
  });

  it('has the given text', () => {
    const validComment = makeComment({ ...validCommentData, text: 'text' });
    expect(validComment.getText()).toEqual('text');
  });

  it('has the given creation date', () => {
    const creationDate = Date.parse('10/10/2010');
    const validComment = makeComment({ ...validCommentData, createdAt: creationDate });
    expect(validComment.getCreatedAt()).toEqual(creationDate);
  });

  it('uses current date as creation date if one is not provided', () => {
    const now = Date.now();
    commentFactoryDependencies.getCurrentDate.mockReturnValue(now);
    const validComment = makeComment({ ...validCommentData, createdAt: undefined });
    expect(validComment.getCreatedAt()).toEqual(now);
  });

  it('has the given modification date', () => {
    const modificationDate = Date.parse('10/10/2010');
    const validComment = makeComment({ ...validCommentData, modifiedAt: modificationDate });
    expect(validComment.getModifiedAt()).toEqual(modificationDate);
  });

  it('uses current date as modification date if one is not provided', () => {
    const now = Date.now();
    commentFactoryDependencies.getCurrentDate.mockReturnValue(now);
    const validComment = makeComment({ ...validCommentData, modifiedAt: undefined });
    expect(validComment.getModifiedAt()).toEqual(now);
  });

  it('has the given delete date', () => {
    const deleteDate = Date.parse('10/10/2010');
    const validComment = makeComment({ ...validCommentData, deletedAt: deleteDate });
    expect(validComment.getDeletedAt()).toEqual(deleteDate);
  });

  it('sets the delete date to the current date when deleting', () => {
    const now = Date.now();
    commentFactoryDependencies.getCurrentDate.mockReturnValue(now);
    const validComment = makeComment(validCommentData);
    validComment.delete();
    expect(validComment.getDeletedAt()).toEqual(now);
  });

  it('sets the delete date to null when restoring', () => {
    commentFactoryDependencies.getCurrentDate.mockReturnValue(Date.now());
    const validComment = makeComment(validCommentData);
    validComment.delete();
    validComment.restore();
    expect(validComment.getDeletedAt()).toEqual(null);
  });
});
