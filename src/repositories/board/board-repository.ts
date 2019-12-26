import { Document, Types } from 'mongoose';
import { BoardData, BoardRepository } from '../../app/entities/board';
import { ColumnDocument } from '../column/column-repository';
import { User, UserDocument } from '../user/user-repository';

export interface BoardDocument extends Document {
  name: string;
  invitedUsersIds: UserDocument['_id'][];
  columns: Types.DocumentArray<ColumnDocument>;
  hash: string;
}

export default function makeBoardRepository(): BoardRepository {
  return {
    async count(userId: string): Promise<number> {
      const user = await User.findById(userId);
      if (!user) return 0;

      return user.boards.length;
    },
    get: async function get(userId: string): Promise<BoardData[]> {
      const user = await User.findById(userId, 'boards');
      if (!user) return [];

      return user.boards.map<BoardData>(board => ({
        id: board._id,
        userId,
        name: board.name,
        invitedUsersIds: board.invitedUsersIds,
        hash: board.hash,
      }));
    },
    findById: async function findById(boardId: string): Promise<BoardData | null> {
      const user = await User.findOne({ 'boards._id': boardId }, 'boards');
      if (!user) return null;

      const board = user.boards.id(boardId);

      return {
        id: board._id,
        userId: user.id,
        name: board.name,
        invitedUsersIds: board.invitedUsersIds,
        hash: board.hash,
      };
    },
    save: async function save(boardData: {
      userId: string;
      invitedUsersIds: string[];
      name: string;
      hash: string;
    }): Promise<BoardData> {
      const user = await User.findById(boardData.userId);
      if (!user) throw new Error('User not found');

      const board = user.boards.create({
        name: boardData.name,
        invitedUsersIds: boardData.invitedUsersIds,
        hash: boardData.hash,
      });

      user.boards.push(board);
      await user.save();

      return {
        id: board._id,
        userId: user.id,
        name: board.name,
        invitedUsersIds: board.invitedUsersIds,
        hash: board.hash,
      };
    },
  };
}
