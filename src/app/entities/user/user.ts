export type UserFactoryDependencies = {
  generateId: () => string;
  isValidEmail: (email: string) => boolean;
  hashValue: (value: any) => Promise<string>;
};

export type UserFactory = (userData: UserData) => Promise<User>;

export type UserData = {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly avatar?: string | null;
};

export type User = {
  readonly getId: () => string;
  readonly getName: () => string;
  readonly getEmail: () => string;
  readonly getPassword: () => string;
  readonly getAvatar: () => string | null;
  readonly getSessionExpirationTime: () => number;
};

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

export default function buildMakeUser({
  generateId,
  isValidEmail,
  hashValue,
}: UserFactoryDependencies): UserFactory {
  return async function makeUser({ id = generateId(), name, email, password, avatar = null }) {
    if (!name) throw new Error('Name must be provided');
    if (name.trim().length < 3) throw new Error('Name must have at least 3 characters');
    if (!isValidEmail(email)) throw new Error('Email must be a valid email');
    if (!password || password.length < 8)
      throw new Error('Password must have at least 8 characters');

    const hashedPassword = await hashValue(password);

    return {
      getId: () => id,
      getName: () => name,
      getEmail: () => email,
      getPassword: () => hashedPassword,
      getAvatar: () => avatar,
      getSessionExpirationTime: () => THREE_DAYS,
    };
  };
}