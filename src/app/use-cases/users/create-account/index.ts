import { userModel } from '../../../../models';
import makeUser from '../../../entities/user';
import makeCreateAccount from './create-account';

const createAccount = makeCreateAccount({ makeUser, userModel });

export default createAccount;
export * from './create-account';
