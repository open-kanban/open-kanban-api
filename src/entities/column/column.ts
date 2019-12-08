export type ColumnFactoryDependencies = {
  generateId: () => string;
};

export type ColumnFactory = (columnData: ColumnData) => Column;

export type ColumnData = {
  readonly id?: string;
  readonly boardId: string;
  readonly name: string;
};

export type Column = {
  readonly getId: () => string;
  readonly getBoardId: () => string;
  readonly getName: () => string;
};

export default function buildMakeColumn({ generateId }: ColumnFactoryDependencies): ColumnFactory {
  return function makeColumn({ id = generateId(), boardId, name }): Column {
    if (!boardId) throw new Error('Board ID must be provided');
    if (!name) throw new Error('Name must be provided');

    return {
      getId: () => id,
      getBoardId: () => boardId,
      getName: () => name,
    };
  };
}
