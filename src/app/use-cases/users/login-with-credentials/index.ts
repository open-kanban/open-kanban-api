import bcrypt from 'bcrypt';
import { userRepository } from '../../../../repositories';
import makeUser from '../../../entities/user';
import makeLoginWithCredentials from './login-with-credentials';

const loginWithCredentials = makeLoginWithCredentials({
  makeUser,
  userRepository,
  compareValueToHash: async (value, hash) => bcrypt.compare(value, hash),
});

export default loginWithCredentials;
export * from './login-with-credentials';
