import { boardRepository } from '../../../../repositories';
import makeBoard from '../../../entities/board';
import makeCreateBoard from './create-board';

export * from './create-board';
export default makeCreateBoard({ boardRepository, makeBoard });
