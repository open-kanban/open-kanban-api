import { ColumnData, ColumnFactory, ColumnRepository } from '../../../entities/column';

export type CreateColumnDependencies = {
  makeColumn: ColumnFactory;
  columnRepository: ColumnRepository;
};

export type CreateColumn = (columnData: { boardId: string; name: string }) => Promise<ColumnData>;

export default function makeCreateColumn({
  makeColumn,
  columnRepository,
}: CreateColumnDependencies): CreateColumn {
  return async function createColumn({ name, boardId }): Promise<ColumnData> {
    const column = await makeColumn();
    column.setName(name);
    column.setBoardId(boardId);

    const savedColumnData = await columnRepository.save({
      boardId: column.getBoardId(),
      name: column.getName(),
    });

    return savedColumnData;
  };
}
