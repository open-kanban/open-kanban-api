import createBoard from '../../app/use-cases/boards/create-board';
import listBoards from '../../app/use-cases/boards/list-boards';
import makeGetBoards from './get-boards-controller';
import makePostBoards from './post-boards-controller';

export const getBoards = makeGetBoards({ listBoards });
export const postBoards = makePostBoards({ createBoard });
