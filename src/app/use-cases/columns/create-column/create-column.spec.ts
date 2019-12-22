import {
  makeFakeColumn,
  getFakeColumnData,
  getColumnModelMock,
} from '../../../../../__tests__/fixtures/column';
import makeCreateColumn, { CreateColumn } from './create-column';

describe('Create column', () => {
  const validColumnData = getFakeColumnData();
  const fakeColumn = makeFakeColumn();
  let createColumn: CreateColumn;
  const createColumnDependencies = {
    makeColumn: jest.fn(),
    columnModel: getColumnModelMock(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    createColumn = makeCreateColumn(createColumnDependencies);
    createColumnDependencies.makeColumn.mockReturnValue(fakeColumn);
    createColumnDependencies.columnModel.save.mockResolvedValue(validColumnData);
  });

  it('creates a column entity with the given data', async () => {
    await createColumn(validColumnData);
    expect(createColumnDependencies.makeColumn).toBeCalledWith({
      boardId: validColumnData.boardId,
      name: validColumnData.name,
    });
  });

  it('saves the created column', async () => {
    await createColumn(validColumnData);
    expect(createColumnDependencies.columnModel.save).toBeCalledWith({
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
