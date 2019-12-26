import { getColumnRepositoryMock, getFakeColumnData } from '../../../../__tests__/fixtures/column';
import buildMakeColumn, { ColumnFactory } from './column';

describe('Column factory', () => {
  const validColumnData = getFakeColumnData();
  const columnFactoryDependencies = {
    columnRepository: getColumnRepositoryMock(),
  };
  let makeColumn: ColumnFactory;

  beforeEach(() => {
    makeColumn = buildMakeColumn(columnFactoryDependencies);
    columnFactoryDependencies.columnRepository.findById.mockResolvedValue(null);
  });

  describe('data validation', () => {
    it('throws if name id is empty', async () => {
      const column = await makeColumn();
      expect(() => column.setName('')).toThrow('Name must be provided');
    });
  });

  describe('data retrieval', () => {
    it('has the given name', async () => {
      const validColumn = await makeColumn();
      validColumn.setName('name');
      expect(validColumn.getName()).toEqual('name');
    });

    it('has the given board ID', async () => {
      const validColumn = await makeColumn();
      validColumn.setBoardId('boardId');
      expect(validColumn.getBoardId()).toEqual('boardId');
    });
  });

  describe('data retrieval when column ID is provided', () => {
    beforeEach(() => {
      columnFactoryDependencies.columnRepository.findById.mockResolvedValue(validColumnData);
    });

    it('finds the column data', async () => {
      await makeColumn('columnId');
      expect(columnFactoryDependencies.columnRepository.findById).toBeCalledWith('columnId');
    });

    it('rejects if column was not found', async () => {
      columnFactoryDependencies.columnRepository.findById.mockResolvedValue(null);
      await expect(makeColumn('columnId')).rejects.toThrow('Column not found');
    });

    it('populates the column name from the found column', async () => {
      const column = await makeColumn('columnId');
      expect(column.getName()).toEqual(validColumnData.name);
    });

    it('populates the column board ID from the found column', async () => {
      const column = await makeColumn('columnId');
      expect(column.getBoardId()).toEqual(validColumnData.boardId);
    });
  });
});
