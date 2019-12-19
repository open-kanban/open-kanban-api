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
    // count: async function count({ userId }: { userId: string }) {
    //   const user = await User.findById(userId);
    //   if (!user) return 0;

    //   return user.boards.length;
    // },
    // get: async function get({
    //   userId,
    //   offset = 0,
    //   limit = 10,
    // }: {
    //   userId: string;
    //   limit?: number;
    //   offset?: number;
    // }) {
    //   const user = await User.findById(userId, 'boards');
    //   if (!user) return [];

    //   return user.boards.map<Required<BoardData>>(board => ({
    //     id: board._id,
    //     userId,
    //     name: board.name,
    //     invitedUsersIds: board.invitedUsersIds,
    //   }));
    // },
    // findById: async function findById(boardId: string) {
    //   const user = await User.findOne({ 'boards._id': boardId }, 'boards');
    //   if (!user) return null;

    //   const board = user.boards.id(boardId);

    //   return {
    //     id: board._id,
    //     userId: user.id,
    //     name: board.name,
    //     invitedUsersIds: board.invitedUsersIds,
    //   };
    // },
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
