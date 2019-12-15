import { boardModel } from '../../../../models';
import makeBoard from '../../../entities/board';
import makeCreateBoard from './create-board';

export * from './create-board';
export default makeCreateBoard({ boardModel, makeBoard });
