import { boardRepository } from '../../../../repositories';
import makeListBoards from './list-boards';

export * from './list-boards';
export default makeListBoards({ boardRepository });
