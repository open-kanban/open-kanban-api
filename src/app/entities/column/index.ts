import cuid from 'cuid';
import buildMakeColumn from './column';

const makeColumn = buildMakeColumn({ generateId: cuid });

export default makeColumn;
export * from './column';

