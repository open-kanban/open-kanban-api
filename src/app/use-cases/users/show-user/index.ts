import { userModel } from '../../../../models';
import makeShowUser from './show-user';

const showUser = makeShowUser({
  userModel,
});

export default showUser;
export * from './show-user';

