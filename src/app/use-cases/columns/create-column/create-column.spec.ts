import {
  getColumnRepositoryMock,
  getFakeColumnData,
  makeFakeColumn,
} from '../../../../../__tests__/fixtures/column';
import makeCreateColumn, { CreateColumn } from './create-column';

describe('Create column', () => {
  const validColumnData = getFakeColumnData();
  const fakeColumn = makeFakeColumn();
  let createColumn: CreateColumn;
  const createColumnDependencies = {
    makeColumn: jest.fn(),
    columnRepository: getColumnRepositoryMock(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    createColumn = makeCreateColumn(createColumnDependencies);
    createColumnDependencies.makeColumn.mockReturnValue(fakeColumn);
    createColumnDependencies.columnRepository.save.mockResolvedValue(validColumnData);
  });

  it('creates a column entity and sets the given data', async () => {
    await createColumn(validColumnData);
    expect(createColumnDependencies.makeColumn).toBeCalledWith();
    expect(fakeColumn.setBoardId).toBeCalledWith(validColumnData.boardId);
    expect(fakeColumn.setName).toBeCalledWith(validColumnData.name);
  });

  it('saves the created column', async () => {
    await createColumn(validColumnData);
    expect(createColumnDependencies.columnRepository.save).toBeCalledWith({
      boardId: fakeColumn.getBoardId(),
      name: fakeColumn.getName(),
    });
  });

  it('resolves with the saved column data', async () => {
    const result = createColumn(validColumnData);
    await expect(result).resolves.toEqual({
      id: validColumnData.id,
      boardId: validColumnData.boardId,
      name: validColumnData.name,
    });
  });
});
