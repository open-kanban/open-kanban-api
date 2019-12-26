import { getFakeUserData, getUserRepositoryMock } from '../../../../__tests__/fixtures/user';
import buildMakeUser, { User, UserFactory } from './user';

describe('User factory', () => {
  const validUserData = getFakeUserData();
  const userFactoryDependencies = {
    userRepository: getUserRepositoryMock(),
    isValidEmail: jest.fn(),
    hashValue: jest.fn(),
  };
  let makeUser: UserFactory;

  beforeEach(() => {
    userFactoryDependencies.userRepository.findById.mockResolvedValue(null);
    userFactoryDependencies.userRepository.findByEmail.mockResolvedValue(null);
    userFactoryDependencies.isValidEmail.mockReturnValue(true);
    userFactoryDependencies.hashValue.mockResolvedValue('hashed password');
    makeUser = buildMakeUser(userFactoryDependencies);
  });

  describe('data validation', () => {
    let user: User;

    beforeEach(async () => {
      user = await makeUser();
    });

    it('throws if name has less than 3 characters', async () => {
      expect(() => user.setName('Ed')).toThrow('Name must have at least 3 characters');
    });

    it('throws if name has less than 3 characters excluding white spaces', async () => {
      expect(() => user.setName('Ed    ')).toThrow('Name must have at least 3 characters');
    });

    it('throws if email is not valid', async () => {
      userFactoryDependencies.isValidEmail.mockReturnValue(false);
      await expect(user.setEmail('invalid')).rejects.toThrow('Email must be a valid email');
    });

    it('does not validate the email if given email is the same as current one', async () => {
      await user.setEmail('some@email.com');
      jest.clearAllMocks();
      await user.setEmail('some@email.com');
      expect(userFactoryDependencies.isValidEmail).not.toHaveBeenCalled();
    });

    it('throws if email is already being used', async () => {
      userFactoryDependencies.userRepository.findByEmail.mockResolvedValue(validUserData);
      await expect(user.setEmail('alreadyUsed')).rejects.toThrow('Email is already being used');
    });

    it('does not check if email is unique if given email is the same as current one', async () => {
      await user.setEmail('some@email.com');
      jest.clearAllMocks();
      await user.setEmail('some@email.com');
      expect(userFactoryDependencies.userRepository.findByEmail).not.toHaveBeenCalled();
    });

    it('throws if password has less than 8 characters', async () => {
      await expect(user.setPassword('1234567')).rejects.toThrow(
        'Password must have at least 8 characters'
      );
    });
  });

  describe('data retrieval', () => {
    let user: User;

    beforeEach(async () => {
      user = await makeUser();
    });

    it('has the given name', async () => {
      user.setName('name');
      expect(user.getName()).toEqual('name');
    });

    it('has the given email', async () => {
      await user.setEmail('email');
      expect(user.getEmail()).toEqual('email');
    });

    it('has the given password hashed', async () => {
      await user.setPassword('password');
      expect(user.getPassword()).toEqual('hashed password');
      expect(userFactoryDependencies.hashValue).toHaveBeenCalledWith('password');
    });

    it('has the given avatar', async () => {
      user.setAvatar('avatar');
      expect(user.getAvatar()).toEqual('avatar');
    });

    it('has a session expiration time of 3 days', async () => {
      const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
      expect(user.getSessionExpirationTime()).toEqual(THREE_DAYS);
    });
  });

  describe('data retrieval when user ID is provided', () => {
    beforeEach(() => {
      userFactoryDependencies.userRepository.findById.mockResolvedValue(validUserData);
    });

    it('finds the user data', async () => {
      await makeUser('userId');
      expect(userFactoryDependencies.userRepository.findById).toBeCalledWith('userId');
    });

    it('rejects if user was not found', async () => {
      userFactoryDependencies.userRepository.findById.mockResolvedValue(null);
      await expect(makeUser('userId')).rejects.toThrow('User not found');
    });

    it('populates the user name from the found user', async () => {
      const user = await makeUser('userId');
      expect(user.getName()).toEqual(validUserData.name);
    });

    it('populates the user email from the found user', async () => {
      const user = await makeUser('userId');
      expect(user.getEmail()).toEqual(validUserData.email);
    });

    it('populates the user password from the found user', async () => {
      const user = await makeUser('userId');
      expect(user.getPassword()).toEqual(validUserData.password);
    });

    it('populates the user avatar from the found user', async () => {
      const user = await makeUser('userId');
      expect(user.getAvatar()).toEqual(validUserData.avatar);
    });
  });
});
