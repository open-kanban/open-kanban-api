import createBoard from '../../app/use-cases/boards/create-board';
import listBoards from '../../app/use-cases/boards/list-boards';
import makeBoardsGetController from './boards-get-controller';
import makeBoardsPostController from './boards-post-controller';

const boardsController = {
  get: makeBoardsGetController({ listBoards }),
  post: makeBoardsPostController({ createBoard }),
};

export default boardsController;
