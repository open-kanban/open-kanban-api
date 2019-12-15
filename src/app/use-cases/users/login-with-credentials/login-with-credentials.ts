import { UserModel } from '..';
import { UserFactory } from '../../../entities/user';

export type LoginWithCredentialsDependencies = {
  userModel: UserModel;
  compareValueToHash: (value: any, hash: string) => Promise<boolean>;
  makeUser: UserFactory;
};

export type LoginWithCredentials = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<{ sessionExpirationTime: number; userId: string }>;

export default function makeLoginWithCredentials({
  userModel,
  compareValueToHash,
  makeUser,
}: LoginWithCredentialsDependencies): LoginWithCredentials {
  return async function loginWithCredentials({ email, password }) {
    const userData = await userModel.findByEmail(email);
    if (!userData) throw new Error('Wrong credentials');

    const passwordIsCorrect = await compareValueToHash(password, userData.password);
    if (!passwordIsCorrect) throw new Error('Wrong credentials');

    const user = await makeUser(userData);

    return {
      sessionExpirationTime: user.getSessionExpirationTime(),
      userId: user.getId(),
    };
  };
}
