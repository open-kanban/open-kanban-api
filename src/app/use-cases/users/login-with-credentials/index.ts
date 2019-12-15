import bcrypt from 'bcrypt';
import { userModel } from '../../../../models';
import makeUser from '../../../entities/user';
import makeLoginWithCredentials from './login-with-credentials';

const loginWithCredentials = makeLoginWithCredentials({
  makeUser,
  userModel,
  compareValueToHash: async (value, hash) => bcrypt.compare(value, hash),
});

export default loginWithCredentials;
export * from './login-with-credentials';

