import { UserFullData, UserRepository } from '../../../entities/user';

export type ShowUserDependencies = {
  userRepository: UserRepository;
};

export type ShowUser = (userId: string) => Promise<UserFullData>;

export default function makeShowUser({ userRepository }: ShowUserDependencies): ShowUser {
  return async function showUser(userId): Promise<UserFullData> {
    if (!userId) throw new Error('User not found');

    const userData = await userRepository.findFullDataById(userId);
    if (!userData) throw new Error('User not found');

    return userData;
  };
}
