import { UserModel } from '..';
import { UserData, UserFactory } from '../../../entities/user';

export type CreateAccountDependencies = {
  makeUser: UserFactory;
  userModel: UserModel;
};

export type CreateAccount = (userData: UserData) => Promise<UserData>;

export default function makeCreateAccount({
  makeUser,
  userModel,
}: CreateAccountDependencies): CreateAccount {
  return async function createAccount(userData) {
    const userExists = !!(await userModel.findByEmail(userData.email));
    if (userExists) throw new Error('User already exists');

    const user = await makeUser(userData);

    return userModel.save({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      avatar: user.getAvatar(),
    });
  };
}
