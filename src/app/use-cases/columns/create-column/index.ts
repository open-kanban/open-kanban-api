import { columnModel } from '../../../../models';
import makeColumn from '../../../entities/column';
import makeCreateColumn from './create-column';

export * from './create-column';
export default makeCreateColumn({ columnModel, makeColumn });
