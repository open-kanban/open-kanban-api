import { ColumnData } from "../../entities/column";

export type ColumnModel = {
  // get: (options: {
  //   userId: string;
  // }) => Promise<Required<BoardData>[]>;
  // count: (options: { userId: string }) => Promise<number>;
  // findById: (boardId: string) => Promise<Required<BoardData> | null>;
  save: (columnData: ColumnData) => Promise<Required<ColumnData>>;
}
