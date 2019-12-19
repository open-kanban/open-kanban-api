import createColumn from '../../app/use-cases/columns/create-column';
import makePostColumns from './post-column';

const columnsController = {
  post: makePostColumns({ createColumn }),
};

export default columnsController;
