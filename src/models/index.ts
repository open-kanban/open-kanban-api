import makeBoardModel from './board/board-model';
import makeColumnModel from './column/column-model';
import makeUserModel from './user/user-model';

export const userModel = makeUserModel();
export const boardModel = makeBoardModel();
export const columnModel = makeColumnModel();
