import { getFakeUserData } from '../../../../__tests__/fixtures/user';
import buildMakeUser, { UserFactory } from './user';

describe('User factory', () => {
  const validUserData = getFakeUserData();
  const userFactoryDependencies = {
    generateId: jest.fn(),
    isValidEmail: jest.fn(),
    hashValue: jest.fn(),
  };
  let makeUser: UserFactory;

  beforeEach(() => {
    userFactoryDependencies.generateId.mockReturnValue('123');
    userFactoryDependencies.isValidEmail.mockReturnValue(true);
    userFactoryDependencies.hashValue.mockResolvedValue('hashed password');
    makeUser = buildMakeUser(userFactoryDependencies);
  });

  it('throws if name has less than 3 characters', async () => {
    await expect(makeUser({ ...validUserData, name: 'Ed' })).rejects.toThrow(
      'Name must have at least 3 characters'
    );
  });

  it('throws if name has less than 3 characters excluding white spaces', async () => {
    await expect(makeUser({ ...validUserData, name: 'Ed    ' })).rejects.toThrow(
      'Name must have at least 3 characters'
    );
  });

  it('throws if email is not valid', async () => {
    userFactoryDependencies.isValidEmail.mockReturnValue(false);
    await expect(makeUser({ ...validUserData, email: 'invalid' })).rejects.toThrow(
      'Email must be a valid email'
    );
  });

  it('throws if password is not provided', async () => {
    await expect(makeUser({ ...validUserData, password: '' })).rejects.toThrow(
      'Password must have at least 8 characters'
    );
  });

  it('throws if password has less than 8 characters', async () => {
    await expect(makeUser({ ...validUserData, password: '1234567' })).rejects.toThrow(
      'Password must have at least 8 characters'
    );
  });

  it('generates an id', async () => {
    userFactoryDependencies.generateId.mockReturnValue('RandomID');
    const validUser = await makeUser({ ...validUserData, id: undefined });
    expect(validUser.getId()).toEqual('RandomID');
  });

  it('has the given id', async () => {
    const validUser = await makeUser({ ...validUserData, id: '123' });
    expect(validUser.getId()).toEqual('123');
  });

  it('has the given name', async () => {
    const validUser = await makeUser({ ...validUserData, name: 'name' });
    expect(validUser.getName()).toEqual('name');
  });

  it('has the given email', async () => {
    const validUser = await makeUser({ ...validUserData, email: 'email' });
    expect(validUser.getEmail()).toEqual('email');
  });

  it('has the given password hashed', async () => {
    const validUser = await makeUser({ ...validUserData, password: 'password' });
    expect(validUser.getPassword()).toEqual('hashed password');
    expect(userFactoryDependencies.hashValue).toHaveBeenCalledWith('password');
  });

  it('has the given avatar', async () => {
    const validUser = await makeUser({ ...validUserData, avatar: 'avatar' });
    expect(validUser.getAvatar()).toEqual('avatar');
  });

  it('has a session expiration time of 3 days', async () => {
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
    const validUser = await makeUser(validUserData);
    expect(validUser.getSessionExpirationTime()).toEqual(THREE_DAYS);
  });
});
