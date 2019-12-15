import createAccount from '../../app/use-cases/users/create-account';
import showUser from '../../app/use-cases/users/show-user';
import makeGetUser from './get-user-controller';
import makePostUsers from './post-users-controller';

export const getUser = makeGetUser({ showUser });
export const postUsers = makePostUsers({ createAccount });
