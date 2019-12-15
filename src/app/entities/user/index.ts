import bcrypt from 'bcrypt';
import cuid from 'cuid';
import * as EmailValidator from 'email-validator';
import buildMakeUser from './user';

const makeUser = buildMakeUser({
  generateId: cuid,
  hashValue: async value => bcrypt.hash(value, 10),
  isValidEmail: email => EmailValidator.validate(email),
});

export default makeUser;
export * from './user';
