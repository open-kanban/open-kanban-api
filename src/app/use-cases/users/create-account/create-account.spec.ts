import { getUserRepositoryMock, makeFakeUser } from '../../../../../__tests__/fixtures/user';
import makeCreateAccount, { CreateAccount } from './create-account';

describe('Create account', () => {
  const rawUserData = { name: 'n', email: 'e', password: 'p', avatar: 'a' };
  const fakeUser = makeFakeUser();
  fakeUser.getName.mockReturnValue('validName');
  fakeUser.getEmail.mockReturnValue('validEmail');
  fakeUser.getPassword.mockReturnValue('validPassword');
  fakeUser.getAvatar.mockReturnValue('validAvatar');

  const createAccountDependencies = {
    makeUser: jest.fn(),
    userRepository: getUserRepositoryMock(),
  };
  let createAccount: CreateAccount;

  beforeEach(() => {
    jest.clearAllMocks();
    createAccountDependencies.makeUser.mockResolvedValue(fakeUser);
    createAccountDependencies.userRepository.findByEmail.mockResolvedValue(null);
    createAccountDependencies.userRepository.save.mockResolvedValue({});
    createAccount = makeCreateAccount(createAccountDependencies);
  });

  it('creates a user entity and sets it with the given user data', async () => {
    await createAccount(rawUserData);
    expect(createAccountDependencies.makeUser).toBeCalledWith();
    expect(fakeUser.setName).toBeCalledWith('n');
    expect(fakeUser.setEmail).toBeCalledWith('e');
    expect(fakeUser.setPassword).toBeCalledWith('p');
    expect(fakeUser.setAvatar).toBeCalledWith('a');
  });

  it('saves the created user', async () => {
    await createAccount(rawUserData);
    expect(createAccountDependencies.userRepository.save).toHaveBeenCalledWith({
      name: 'validName',
      email: 'validEmail',
      password: 'validPassword',
      avatar: 'validAvatar',
    });
  });

  it('resolves with the created user data', async () => {
    createAccountDependencies.userRepository.save.mockResolvedValue({ userData: 'user data' });
    await expect(createAccount(rawUserData)).resolves.toEqual({ userData: 'user data' });
  });
});
