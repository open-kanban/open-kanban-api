import { boardModel } from '../../../../models';
import makeListBoards from './list-boards';

export * from './list-boards';
export default makeListBoards({ boardsModel: boardModel });
