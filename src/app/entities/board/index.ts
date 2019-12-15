import cuid from 'cuid';
import buildMakeBoard from './board';

const makeBoard = buildMakeBoard({ generateId: cuid });

export default makeBoard;
export * from './board';
