import makeBoardRepository from './board/board-repository';
import makeCardRepository from './card/card-repository';
import makeColumnRepository from './column/column-repository';
import makeUserRepository from './user/user-repository';

export const userRepository = makeUserRepository();
export const columnRepository = makeColumnRepository();
export const boardRepository = makeBoardRepository();
export const cardRepository = makeCardRepository();
