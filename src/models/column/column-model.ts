import { Document } from 'mongoose';
import { ColumnData } from '../../app/entities/column';
import { ColumnModel } from '../../app/use-cases/columns';
import { User } from '../user/user-model';

export interface ColumnDocument extends Document {
  name: string;
  boardId: string;
}

export default function makeColumnModel(): ColumnModel {
  return {
    save: async function save({ boardId, name }: ColumnData): Promise<Required<ColumnData>> {
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
  };
}
