import { Document, model, Schema, Types } from 'mongoose';
import { UserData, UserRepository } from '../../app/entities/user';
import { BoardDocument } from '../../models/board/board-model';

const columnSchema = new Schema({
  name: String,
});

const boardSchema = new Schema({
  name: String,
  invitedUsersIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

export default function makeUserRepository(): UserRepository {
  return {
    findByEmail: async (email: string): Promise<UserData | null> => {
      const user = await User.findOne({ email });
      if (!user) return null;

      return parseUserDocumentToUserData(user);
    },
    findById: async (userId): Promise<UserData | null> => {
      const user = await User.findById(userId);
      if (!user) return null;

      return parseUserDocumentToUserData(user);
    },
    save: async ({ name, email, password, avatar }): Promise<UserData> => {
      const user = await User.create({ name, email, password, avatar });

      return parseUserDocumentToUserData(user);
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
