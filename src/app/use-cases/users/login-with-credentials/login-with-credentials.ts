import { UserFactory, UserRepository } from '../../../entities/user';

export type LoginWithCredentialsDependencies = {
  userRepository: UserRepository;
  compareValueToHash: (value: any, hash: string) => Promise<boolean>;
  makeUser: UserFactory;
};

export type LoginWithCredentials = (credentials: {
  email: string;
  password: string;
}) => Promise<{ sessionExpirationTime: number; userId: string }>;

export default function makeLoginWithCredentials({
  userRepository,
  compareValueToHash,
  makeUser,
}: LoginWithCredentialsDependencies): LoginWithCredentials {
  return async function loginWithCredentials({
    email,
    password,
  }): Promise<{ sessionExpirationTime: number; userId: string }> {
    const userData = await userRepository.findByEmail(email);
    if (!userData) throw new Error('Wrong credentials');

    const passwordIsCorrect = await compareValueToHash(password, userData.password);
    if (!passwordIsCorrect) throw new Error('Wrong credentials');

    const user = await makeUser(userData.id);

    return {
      sessionExpirationTime: user.getSessionExpirationTime(),
      userId: userData.id,
    };
  };
}
