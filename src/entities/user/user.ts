export type UserFactoryDependencies = {
  generateId: () => string;
  isValidEmail: (email: string) => boolean;
};

export type UserFactory = (userData: UserData) => User;

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
};

export default function buildMakeUser({
  generateId,
  isValidEmail,
}: UserFactoryDependencies): UserFactory {
  return function makeUser({ id = generateId(), name, email, password, avatar = null }): User {
    if (!name) throw new Error('Name must be provided');
    if (name.trim().length < 3) throw new Error('Name must have at least 3 characters');
    if (!isValidEmail(email)) throw new Error('Email must be a valid email');
    if (!password || password.length < 8)
      throw new Error('Password must have at least 8 characters');

    return {
      getId: () => id,
      getName: () => name,
      getEmail: () => email,
      getPassword: () => password,
      getAvatar: () => avatar,
    };
  };
}
