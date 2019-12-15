import makeCreateAccount, { CreateAccount } from './create-account';
import { getUserModelMock, makeFakeUser } from '../../../../../__tests__/fixtures/user';

describe('Create account', () => {
  const rawUserData = { name: 'n', email: 'e', password: 'p', avatar: 'a' };
  const fakeUser = makeFakeUser();
  fakeUser.getId.mockReturnValue('validId');
  fakeUser.getName.mockReturnValue('validName');
  fakeUser.getEmail.mockReturnValue('validEmail');
  fakeUser.getPassword.mockReturnValue('validPassword');
  fakeUser.getAvatar.mockReturnValue('validAvatar');

  const createAccountDependencies = {
    makeUser: jest.fn(),
    userModel: getUserModelMock(),
  };
  let createAccount: CreateAccount;

  beforeEach(() => {
    jest.clearAllMocks();
    createAccountDependencies.makeUser.mockResolvedValue(fakeUser);
    createAccountDependencies.userModel.findByEmail.mockResolvedValue(null);
    createAccountDependencies.userModel.save.mockResolvedValue({ userData: 'user data' });
    createAccount = makeCreateAccount(createAccountDependencies);
  });

  it('creates a user entity with the given user data', async () => {
    await createAccount(rawUserData);
    expect(createAccountDependencies.makeUser).toHaveBeenCalledWith({
      name: 'n',
      email: 'e',
      password: 'p',
      avatar: 'a',
    });
  });

  it('checks if the user already exists', async () => {
    await createAccount(rawUserData);
    expect(createAccountDependencies.userModel.findByEmail).toHaveBeenCalledWith('e');
  });

  it('throws if user already exists', async () => {
    createAccountDependencies.userModel.findByEmail.mockResolvedValue({});
    const result = createAccount(rawUserData);
    await expect(result).rejects.toThrow('User already exists');
  });

  it('saves the created user', async () => {
    await createAccount(rawUserData);
    expect(createAccountDependencies.userModel.save).toHaveBeenCalledWith({
      id: 'validId',
      name: 'validName',
      email: 'validEmail',
      password: 'validPassword',
      avatar: 'validAvatar',
    });
  });

  it('resolves with the created user data', async () => {
    await expect(createAccount(rawUserData)).resolves.toEqual({ userData: 'user data' });
  });
});
