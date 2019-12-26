import { Document, model, Schema, Types } from 'mongoose';
import { UserData, UserFullData, UserRepository } from '../../app/entities/user';
import { BoardDocument } from '../board/board-repository';

const columnSchema = new Schema({
  name: String,
});

const boardSchema = new Schema({
  name: String,
  invitedUsersIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  columns: [columnSchema],
  hash: String,
});

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  boards: [boardSchema],
});

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  boards: Types.DocumentArray<BoardDocument>;
}

export const User = model<UserDocument>('User', userSchema);

export default function makeUserRepository(): UserRepository {
  return {
    async findByEmail(email: string): Promise<UserData | null> {
      const user = await User.findOne({ email });
      if (!user) return null;

      return parseUserDocumentToUserData(user);
    },
    async findById(userId): Promise<UserData | null> {
      const user = await User.findById(userId);
      if (!user) return null;

      return parseUserDocumentToUserData(user);
    },
    async save({ name, email, password, avatar }): Promise<UserData> {
      const user = await User.create({ name, email, password, avatar });

      return parseUserDocumentToUserData(user);
    },
    async findFullDataById(userId): Promise<UserFullData | null> {
      const user = await User.findById(userId);
      if (!user) return null;

      return parseUserDocumentToUserFullData(user);
    },
  };
}

const parseUserDocumentToUserData = (userDocument: UserDocument): UserData => ({
  id: userDocument._id,
  name: userDocument.name,
  email: userDocument.email,
  password: userDocument.password,
  avatar: userDocument.avatar,
});

const parseUserDocumentToUserFullData = (userDocument: UserDocument): UserFullData => ({
  ...parseUserDocumentToUserData(userDocument),
  boards: userDocument.boards.map(boardDocument => ({
    id: boardDocument._id,
    userId: userDocument.id,
    invitedUsersIds: boardDocument.invitedUsersIds,
    name: boardDocument.name,
    hash: boardDocument.hash,
    columns: boardDocument.columns.map(column => ({
      id: column._id,
      boardId: column.boardId,
      name: column.name,
    })),
  })),
});
