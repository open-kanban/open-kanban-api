import bcrypt from 'bcrypt';
import * as EmailValidator from 'email-validator';
import { userRepository } from '../../../repositories';
import buildMakeUser from './user';

const makeUser = buildMakeUser({
  hashValue: async value => bcrypt.hash(value, 10),
  isValidEmail: email => EmailValidator.validate(email),
  userRepository,
});

export default makeUser;
export * from './user';
