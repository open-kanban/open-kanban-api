export type UserFactoryDependencies = {
  isValidEmail: (email: string) => boolean;
  hashValue: (value: string) => Promise<string>;
  userRepository: UserRepository;
};

export type UserFactory = (userId?: string) => Promise<User>;

export type UserData = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type User = {
  readonly setName: (newName: string) => void;
  readonly setEmail: (newEmail: string) => Promise<void>;
  readonly setPassword: (newPassword: string) => Promise<void>;
  readonly setAvatar: (newAvatar: string) => void;
  readonly getName: () => string;
  readonly getEmail: () => string;
  readonly getPassword: () => string;
  readonly getAvatar: () => string;
  readonly getSessionExpirationTime: () => number;
};

export type UserRepository = {
  findById: (userId: string) => Promise<UserData | null>;
  findByEmail: (email: string) => Promise<UserData | null>;
  save: (userData: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  }) => Promise<UserData>;
};

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

export default function buildMakeUser({
  isValidEmail,
  hashValue,
  userRepository,
}: UserFactoryDependencies): UserFactory {
  return async function makeUser(userId): Promise<User> {
    let userName: string;
    let userEmail: string;
    let userPassword: string;
    let userAvatar: string;

    if (userId) {
      const userData = await userRepository.findById(userId);
      if (!userData) throw new Error('User not found');

      userName = userData.name;
      userEmail = userData.email;
      userPassword = userData.password;
      userAvatar = userData.avatar;
    }

    return {
      setName: (newName): void => {
        validateName(newName);
        userName = newName;
      },
      setEmail: async (newEmail): Promise<void> => {
        if (userEmail === newEmail) return;
        await validateEmail(newEmail);
        userEmail = newEmail;
      },
      setPassword: async (newPassword): Promise<void> => {
        validatePassword(newPassword);
        userPassword = await hashValue(newPassword);
      },
      setAvatar: (newAvatar): void => {
        userAvatar = newAvatar;
      },
      getName: (): string => userName,
      getEmail: (): string => userEmail,
      getPassword: (): string => userPassword,
      getAvatar: (): string => userAvatar,
      getSessionExpirationTime: (): number => THREE_DAYS,
    };

    function validateName(name: string): void {
      if (!name || name.trim().length < 3) throw new Error('Name must have at least 3 characters');
    }

    async function validateEmail(email: string): Promise<void> {
      if (!isValidEmail(email)) throw new Error('Email must be a valid email');

      const user = await userRepository.findByEmail(email);
      if (user) throw new Error('Email is already being used');
    }

    function validatePassword(password: string): void {
      if (!password || password.length < 8)
        throw new Error('Password must have at least 8 characters');
    }
  };
}
