import { userRepository } from '../../../../repositories';
import makeShowUser from './show-user';

const showUser = makeShowUser({
  userRepository,
});

export default showUser;
export * from './show-user';
