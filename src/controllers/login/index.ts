import loginWithCredentials from '../../app/use-cases/users/login-with-credentials';
import makePostLogin from './post-login-controller';

export const postLogin = makePostLogin({ loginWithCredentials });
