import { getFakeUserData } from '../../../__tests__/fixtures/user';
import buildMakeUser, { UserFactory } from './user';

describe('User factory', () => {
  const validUserData = getFakeUserData();
  const userFactoryDependencies = {
    generateId: jest.fn(),
    isValidEmail: jest.fn(),
  };
  let makeUser: UserFactory;

  beforeEach(() => {
    userFactoryDependencies.generateId.mockReturnValue('123');
    userFactoryDependencies.isValidEmail.mockReturnValue(true);
    makeUser = buildMakeUser(userFactoryDependencies);
  });

  it('throws if name has less than 3 characters', () => {
    expect(() => makeUser({ ...validUserData, name: 'Ed' })).toThrow('Name must have at least 3 characters');
  });

  it('throws if name has less than 3 characters excluding white spaces', () => {
    expect(() => makeUser({ ...validUserData, name: 'Ed    ' })).toThrow('Name must have at least 3 characters');
  });

  it('throws if email is not valid', () => {
    userFactoryDependencies.isValidEmail.mockReturnValue(false);
    expect(() => makeUser({ ...validUserData, email: 'invalid' })).toThrow('Email must be a valid email');
  });

  it('throws if password is not provided', () => {
    expect(() => makeUser({ ...validUserData, password: undefined })).toThrow('Password must have at least 8 characters');
  });

  it('throws if password has less than 8 characters', () => {
    expect(() => makeUser({ ...validUserData, password: '1234567' })).toThrow('Password must have at least 8 characters');
  });

  it('generates an id', () => {
    userFactoryDependencies.generateId.mockReturnValue('RandomID');
    const validUser = makeUser({ ...validUserData, id: undefined });
    expect(validUser.getId()).toEqual('RandomID');
  });

  it('has the given id', () => {
    const validUser = makeUser({ ...validUserData, id: '123' });
    expect(validUser.getId()).toEqual('123');
  });

  it('has the given name', () => {
    const validUser = makeUser({ ...validUserData, name: 'name' });
    expect(validUser.getName()).toEqual('name');
  });

  it('has the given email', () => {
    const validUser = makeUser({ ...validUserData, email: 'email' });
    expect(validUser.getEmail()).toEqual('email');
  });

  it('has the given password', () => {
    const validUser = makeUser({ ...validUserData, password: 'password' });
    expect(validUser.getPassword()).toEqual('password');
  });

  it('has the given avatar', () => {
    const validUser = makeUser({ ...validUserData, avatar: 'avatar' });
    expect(validUser.getAvatar()).toEqual('avatar');
  });
});
