import { ColumnModel } from '..';
import { ColumnData, ColumnFactory } from '../../../entities/column';

export type CreateColumnDependencies = {
  makeColumn: ColumnFactory;
  columnModel: ColumnModel;
};

export type CreateColumn = (columnData: ColumnData) => Promise<Required<ColumnData>>;

export default function makeCreateColumn({
  makeColumn,
  columnModel,
}: CreateColumnDependencies): CreateColumn {
  return async function createColumn({ name, boardId }): Promise<Required<ColumnData>> {
    const column = makeColumn({ boardId, name });
    const savedColumnData = await columnModel.save({
      boardId: column.getBoardId(),
      name: column.getName(),
    });

    return savedColumnData;
  };
}
