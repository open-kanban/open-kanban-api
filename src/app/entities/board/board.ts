import { ColumnData } from '../column';

export type BoardFactoryDependencies = {
  generateId: () => string;
};

export type BoardFactory = (boardData: BoardData) => Board;

export type BoardData = {
  readonly id?: string;
  readonly userId: string;
  readonly invitedUsersIds?: string[];
  readonly name: string;
  readonly columns: ColumnData[];
};

export type BoardFullData = BoardData & { columns: ColumnData[] };

export type Board = {
  readonly getId: () => string;
  readonly getUserId: () => string;
  readonly getInvitedUsersIds: () => string[];
  readonly getName: () => string;
};

export default function buildMakeBoard({ generateId }: BoardFactoryDependencies): BoardFactory {
  return function makeBoard({ id = generateId(), userId, invitedUsersIds = [], name }): Board {
    if (!userId) throw new Error('User ID must be provided');
    if (!name) throw new Error('Name must be provided');

    return {
      getId: (): string => id,
      getUserId: (): string => userId,
      getInvitedUsersIds: (): string[] => invitedUsersIds,
      getName: (): string => name,
    };
  };
}
