import loginWithCredentials from '../../app/use-cases/users/login-with-credentials';
import makeLoginPostController from './login-post-controller';

const loginController = {
  post: makeLoginPostController({ loginWithCredentials }),
};

export default loginController;
