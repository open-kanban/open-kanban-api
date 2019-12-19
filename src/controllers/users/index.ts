import createAccount from '../../app/use-cases/users/create-account';
import showUser from '../../app/use-cases/users/show-user';
import makeUsersGetController from './users-get-controller';
import makeUsersPostController from './users-post-controller';

const usersController = {
  get: makeUsersGetController({ showUser }),
  post: makeUsersPostController({ createAccount }),
};

export default usersController;
