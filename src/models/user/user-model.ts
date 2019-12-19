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

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
      };
    },
    findById: async (userId): Promise<Required<UserData> | null> => {
      const user = await User.findById(userId);
      if (!user) return null;

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
      };
    },
    save: async ({ name, email, password, avatar }): Promise<Required<UserData>> => {
      const user = await User.create({ name, email, password, avatar });

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
      };
    },
  };
}
