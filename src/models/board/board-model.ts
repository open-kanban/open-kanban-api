import { Document, Schema, Types } from 'mongoose';
import { BoardData } from '../../app/entities/board';
import { BoardModel } from '../../app/use-cases/boards';
import { User, UserDocument } from '../user/user-model';
import { ObjectID } from 'mongodb';
import { ColumnDocument } from '../column/column-model';

export interface BoardDocument extends Document {
  name: string;
  invitedUsersIds: UserDocument['_id'][];
  columns: Types.DocumentArray<ColumnDocument>;
}

export default function makeBoardModel(): BoardModel {
  return {
    count: async function count({ userId }: { userId: string }) {
      const user = await User.findById(userId);
      if (!user) return 0;

      return user.boards.length;
    },
    get: async function get({
      userId,
      offset = 0,
      limit = 10,
    }: {
      userId: string;
      limit?: number;
      offset?: number;
    }) {
      const user = await User.findById(userId, 'boards');
      if (!user) return [];

      return user.boards.map<Required<BoardData>>(board => ({
        id: board._id,
        userId,
        name: board.name,
        invitedUsersIds: board.invitedUsersIds,
      }));
    },
    findById: async function findById(boardId: string) {
      const user = await User.findOne({ 'boards._id': boardId }, 'boards');
      if (!user) return null;

      const board = user.boards.id(boardId);

      return {
        id: board._id,
        userId: user.id,
        name: board.name,
        invitedUsersIds: board.invitedUsersIds,
      };
    },
    save: async function save({ userId, ...boardData }: Required<BoardData>) {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      const board = user.boards.create({
        name: boardData.name,
        invitedUsersIds: boardData.invitedUsersIds,
      });

      user.boards.push(board);
      await user.save();

      return {
        id: board._id,
        userId: user.id,
        name: board.name,
        invitedUsersIds: board.invitedUsersIds,
      };
    },
  };
}
