import { UserData, UserFactory, UserRepository } from '../../../entities/user';

export type CreateAccountDependencies = {
  makeUser: UserFactory;
  userRepository: UserRepository;
};

export type CreateAccount = (userData: {
  name: string;
  email: string;
  password: string;
  avatar: string;
}) => Promise<UserData>;

export default function makeCreateAccount({
  makeUser,
  userRepository,
}: CreateAccountDependencies): CreateAccount {
  return async function createAccount({ name, email, password, avatar }): Promise<UserData> {
    const user = await makeUser();
    user.setName(name);
    user.setEmail(email);
    user.setPassword(password);
    user.setAvatar(avatar);

    return userRepository.save({
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      avatar: user.getAvatar(),
    });
  };
}
