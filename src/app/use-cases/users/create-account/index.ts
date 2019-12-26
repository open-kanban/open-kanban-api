import { userRepository } from '../../../../repositories';
import makeUser from '../../../entities/user';
import makeCreateAccount from './create-account';

const createAccount = makeCreateAccount({ makeUser, userRepository });

export default createAccount;
export * from './create-account';
