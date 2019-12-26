import cuid from 'cuid';
import { boardRepository, userRepository } from '../../../repositories';
import buildMakeBoard from './board';

const makeBoard = buildMakeBoard({ generateId: cuid, userRepository, boardRepository });

export default makeBoard;
export * from './board';
