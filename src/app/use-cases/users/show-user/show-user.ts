import { UserModel } from '..';
import { UserData } from '../../../entities/user';

export type ShowUserDependencies = {
  userModel: UserModel;
};

export type ShowUser = (userId: string) => Promise<Required<UserData>>;

export default function makeShowUser({ userModel }: ShowUserDependencies): ShowUser {
  return async function showUser(userId) {
    if (!userId) throw new Error('User not found');

    const userData = await userModel.findById(userId);
    if (!userData) throw new Error('User not found');

    return userData;
  };
}
