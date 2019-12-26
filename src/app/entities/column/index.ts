import { columnRepository } from '../../../repositories';
import buildMakeColumn from './column';

const makeColumn = buildMakeColumn({ columnRepository });

export default makeColumn;
export * from './column';
