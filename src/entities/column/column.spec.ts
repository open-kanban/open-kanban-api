import { getFakeColumnData } from '../../../__tests__/fixtures/column';
import buildMakeColumn, { ColumnFactory } from './column';

describe('Column factory', () => {
  const validColumnData = getFakeColumnData();
  const columnFactoryDependencies = {
    generateId: jest.fn(),
  };
  let makeColumn: ColumnFactory;

  beforeEach(() => {
    columnFactoryDependencies.generateId.mockReturnValue('123');
    makeColumn = buildMakeColumn(columnFactoryDependencies);
  });

  it('throws if board id is not provided', () => {
    expect(() => makeColumn({ ...validColumnData, boardId: undefined })).toThrow(
      'Board ID must be provided'
    );
  });

  it('throws if name is not provided', () => {
    expect(() => makeColumn({ ...validColumnData, name: undefined })).toThrow('Name must be provided');
  });

  it('generates an id', () => {
    columnFactoryDependencies.generateId.mockReturnValue('RandomID');
    const validColumn = makeColumn({ ...validColumnData, id: undefined });
    expect(validColumn.getId()).toEqual('RandomID');
  });

  it('has the given id', () => {
    const validColumn = makeColumn({ ...validColumnData, id: '123' });
    expect(validColumn.getId()).toEqual('123');
  });

  it('has the given name', () => {
    const validColumn = makeColumn({ ...validColumnData, name: 'name' });
    expect(validColumn.getName()).toEqual('name');
  });
});
