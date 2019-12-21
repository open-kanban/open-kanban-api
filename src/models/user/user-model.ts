import { Document, model, Schema, Types } from 'mongoose';
import { UserData } from '../../app/entities/user';
import { UserModel } from '../../app/use-cases/users';
import { BoardDocument } from '../board/board-model';

const columnSchema = new Schema({
  name: String,
});

const boardSchema = new Schema({
  name: String,
  invitedUsersIds: [Schema.Types.ObjectId],
  columns: [columnSchema],
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

export default function makeUserModel(): UserModel {
  return {
    findByEmail: async (email: string): Promise<Required<UserData> | null> => {
      const user = await User.findOne({ email });
      if (!user) return null;

      return parseUserDocumentToUserData(user);
    },
    findById: async (userId): Promise<Required<UserData> | null> => {
      const user = await User.findById(userId);
      if (!user) return null;

      return parseUserDocumentToUserData(user);
    },
    save: async ({ name, email, password, avatar }): Promise<Required<UserData>> => {
      const user = await User.create({ name, email, password, avatar });

      return parseUserDocumentToUserData(user);
    },
  };
}

const parseUserDocumentToUserData = (userDocument: UserDocument): Required<UserData> => ({
  id: userDocument._id,
  name: userDocument.name,
  email: userDocument.email,
  password: userDocument.password,
  avatar: userDocument.avatar,
  boards: userDocument.boards.map(boardDocument => ({
    id: boardDocument._id,
    userId: userDocument._id,
    name: boardDocument.name,
    invitedUsersIds: boardDocument.invitedUsersIds,
    columns: boardDocument.columns.map(columnDocument => ({
      id: columnDocument._id,
      boardId: boardDocument._id,
      name: columnDocument.name,
    })),
  })),
});
