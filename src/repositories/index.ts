import makeColumnRepository from './column/column-repository';
import makeUserRepository from './user/user-repository';

export const userRepository = makeUserRepository();
export const columnRepository = makeColumnRepository();
