export type ColumnFactoryDependencies = {
  columnRepository: ColumnRepository;
};

export type ColumnFactory = (columnId?: string) => Promise<Column>;

export type ColumnData = {
  id: string;
  boardId: string;
  name: string;
};

export type Column = {
  readonly setName: (newName: string) => void;
  readonly setBoardId: (newBoardId: string) => void;
  readonly getName: () => string;
  readonly getBoardId: () => string;
};

export type ColumnRepository = {
  readonly findById: (columnId: string) => Promise<ColumnData | null>;
  readonly save: (columnData: {
    name: string;
    boardId: string;
  }) => Promise<ColumnData>;
};

export default function buildMakeColumn({
  columnRepository,
}: ColumnFactoryDependencies): ColumnFactory {
  return async function makeColumn(columnId?: string): Promise<Column> {
    let columnName: string;
    let columnBoardId: string;

    if (columnId) {
      const column = await columnRepository.findById(columnId);
      if (!column) throw new Error('Column not found');

      columnName = column.name;
      columnBoardId = column.boardId;
    }

    return {
      setName(newName): void {
        if (!newName) throw new Error('Name must be provided');

        columnName = newName;
      },
      setBoardId(newBoardId): void {
        columnBoardId = newBoardId;
      },
      getBoardId(): string {
        return columnBoardId;
      },
      getName(): string {
        return columnName;
      },
    };
  };
}
