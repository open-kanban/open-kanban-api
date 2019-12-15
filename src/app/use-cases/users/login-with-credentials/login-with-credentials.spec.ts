import { getFakeUserData, getUserModelMock, makeFakeUser } from '../../../../../__tests__/fixtures/user';
import makeLoginWithCredentials, { LoginWithCredentials } from './login-with-credentials';

describe('Login with credentials', () => {
  const fakeUserData = getFakeUserData();
  const fakeUser = makeFakeUser();
  const loginWithCredentialsDependencies = {
    userModel: getUserModelMock(),
    compareValueToHash: jest.fn(),
    makeUser: jest.fn(),
  };
  let loginWithCredentials: LoginWithCredentials;

  beforeEach(() => {
    jest.clearAllMocks();
    loginWithCredentialsDependencies.userModel.findByEmail.mockResolvedValue(fakeUserData);
    loginWithCredentialsDependencies.compareValueToHash.mockResolvedValue(true);
    loginWithCredentialsDependencies.makeUser.mockResolvedValue(fakeUser);
    loginWithCredentials = makeLoginWithCredentials(loginWithCredentialsDependencies);
  });

  it('finds the user with the given email', async () => {
    await loginWithCredentials({ email: 'email', password: 'pass' });
    expect(loginWithCredentialsDependencies.userModel.findByEmail).toHaveBeenCalledWith('email');
  });

  it('throws if user could not be retrieved', async () => {
    loginWithCredentialsDependencies.userModel.findByEmail.mockResolvedValue(null);
    const result = loginWithCredentials({ email: 'email', password: 'pass' });
    await expect(result).rejects.toThrow('Wrong credentials');
  });

  it('checks if the given password is correct for the account', async () => {
    await loginWithCredentials({ email: 'email', password: 'pass' });
    expect(loginWithCredentialsDependencies.compareValueToHash).toHaveBeenCalledWith(
      'pass',
      fakeUserData.password
    );
  });

  it('throws if given password is incorrect for the account', async () => {
    loginWithCredentialsDependencies.compareValueToHash.mockResolvedValue(false);
    const result = loginWithCredentials({ email: 'email', password: 'pass' });
    await expect(result).rejects.toThrow('Wrong credentials');
  });

  it('resolves with user id and session expiration time', async () => {
    fakeUser.getId.mockReturnValue('valid id');
    fakeUser.getSessionExpirationTime.mockReturnValue('valid time');

    const result = loginWithCredentials({ email: 'email', password: 'pass' });

    await expect(result).resolves.toEqual({
      userId: 'valid id',
      sessionExpirationTime: 'valid time',
    });
  });
});
