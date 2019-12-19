import { Controller, HttpResponse } from '..';
import { ColumnData } from '../../app/entities/column';
import { CreateColumn } from '../../app/use-cases/columns/create-column';

export type PostColumnsControllerDependencies = {
  createColumn: CreateColumn;
};

export default function makePostColumns({
  createColumn,
}: PostColumnsControllerDependencies): Controller {
  return async function postColumns({ body, params, authData }): Promise<HttpResponse> {
    const { userId } = params;
    if (userId !== authData.userId)
      return {
        statusCode: 403,
        body: { error: 'Not authorized' },
      };

    const columnData = body as ColumnData;

    try {
      const column = await createColumn(columnData);
      return {
        statusCode: 201,
        body: { column },
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          error: error.message,
        },
      };
    }
  };
}
