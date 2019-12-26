import { Document } from 'mongoose';
import { ColumnData, ColumnRepository } from '../../app/entities/column';
import { User } from '../user/user-repository';

export interface ColumnDocument extends Document {
  name: string;
  boardId: string;
}

export default function makeColumnRepository(): ColumnRepository {
  return {
    async save({ boardId, name }): Promise<ColumnData> {
      const user = await User.findOne({ 'boards._id': boardId });
      if (!user) throw new Error('User not found');

      const board = user.boards.id(boardId);
      const column = board.columns.create({ name, boardId });

      board.columns.push(column);
      await user.save();

      return {
        id: column._id,
        boardId: column.boardId,
        name: column.name,
      };
    },
    async findById(columnId: string): Promise<ColumnData | null> {
      const results = await User.aggregate()
        .unwind('boards', 'boards.columns')
        .match({ 'boards.columns._id': columnId })
        .project({ foundColumn: 'boards.columns' });

      if (!results.length) return null;

      const column = results[0].foundColumn;

      return { id: column.id, boardId: column.boardId, name: column.name };
    },
  };
}
