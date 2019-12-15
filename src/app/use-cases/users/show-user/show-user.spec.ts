import { getFakeUserData, getUserModelMock } from '../../../../../__tests__/fixtures/user';
import { UserData } from '../../../entities/user';
import makeShowUser, { ShowUser } from './show-user';

describe('Show user', () => {
  const showUserDependencies = {
    userModel: getUserModelMock(),
  };
  let fakeUserData: UserData;
  let showUser: ShowUser;

  beforeEach(() => {
    jest.clearAllMocks();
    fakeUserData = getFakeUserData();
    showUserDependencies.userModel.findById.mockResolvedValue(fakeUserData);
    showUser = makeShowUser(showUserDependencies);
  });

  it('throws if user id is empty', async () => {
    const result = showUser('');
    await expect(result).rejects.toThrow('User not found');
  });

  it('retrieves the user from the model', async () => {
    await showUser('userId');
    expect(showUserDependencies.userModel.findById).toHaveBeenCalledWith('userId');
  });

  it('throws if user was not found', async () => {
    showUserDependencies.userModel.findById.mockResolvedValue(null);
    const result = showUser('userId');
    await expect(result).rejects.toThrow('User not found');
  });

  it('resolves with the user data', async () => {
    const result = showUser('userId');
    await expect(result).resolves.toEqual({
      id: fakeUserData.id,
      name: fakeUserData.name,
      email: fakeUserData.email,
      password: fakeUserData.password,
      avatar: fakeUserData.avatar,
    });
  });
});
