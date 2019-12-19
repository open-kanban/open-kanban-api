import createColumn from '../../app/use-cases/columns/create-column';
import makePostColumns from './columns-post-controller';

const columnsController = {
  post: makePostColumns({ createColumn }),
};

export default columnsController;
