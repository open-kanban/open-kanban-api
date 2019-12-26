import { columnRepository } from '../../../../repositories';
import makeColumn from '../../../entities/column';
import makeCreateColumn from './create-column';

export * from './create-column';
export default makeCreateColumn({ columnRepository, makeColumn });
