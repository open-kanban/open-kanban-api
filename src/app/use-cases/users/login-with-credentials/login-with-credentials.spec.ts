import {
  getFakeUserData,
  getUserRepositoryMock,
  makeFakeUser,
} from '../../../../../__tests__/fixtures/user';
import makeLoginWithCredentials, { LoginWithCredentials } from './login-with-credentials';

describe('Login with credentials', () => {
  const fakeUserData = getFakeUserData();
  const fakeUser = makeFakeUser();
  const loginWithCredentialsDependencies = {
    userRepository: getUserRepositoryMock(),
    compareValueToHash: jest.fn(),
    makeUser: jest.fn(),
  };
  let loginWithCredentials: LoginWithCredentials;

  beforeEach(() => {
    jest.clearAllMocks();
    loginWithCredentialsDependencies.userRepository.findByEmail.mockResolvedValue(fakeUserData);
    loginWithCredentialsDependencies.compareValueToHash.mockResolvedValue(true);
    loginWithCredentialsDependencies.makeUser.mockResolvedValue(fakeUser);
    loginWithCredentials = makeLoginWithCredentials(loginWithCredentialsDependencies);
  });

  it('finds the user with the given email', async () => {
    await loginWithCredentials({ email: 'email', password: 'pass' });
    expect(loginWithCredentialsDependencies.userRepository.findByEmail).toHaveBeenCalledWith(
      'email'
    );
  });

  it('throws if user could not be retrieved', async () => {
    loginWithCredentialsDependencies.userRepository.findByEmail.mockResolvedValue(null);
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

  it('creates a user entity with the retrieved user ID', async () => {
    await loginWithCredentials({ email: 'email', password: 'pass' });
    expect(loginWithCredentialsDependencies.makeUser).toBeCalledWith(fakeUserData.id);
  });

  it('resolves with user id and session expiration time', async () => {
    fakeUser.getSessionExpirationTime.mockReturnValue('valid time');

    const result = loginWithCredentials({ email: 'email', password: 'pass' });

    await expect(result).resolves.toEqual({
      userId: fakeUserData.id,
      sessionExpirationTime: 'valid time',
    });
  });
});
