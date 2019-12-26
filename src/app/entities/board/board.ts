import { ColumnData } from '../column';
import { UserRepository } from '../user';

export type BoardFactoryDependencies = {
  generateId: () => string;
  boardRepository: BoardRepository;
  userRepository: UserRepository;
};

export type BoardFactory = (boardId?: string) => Promise<Board>;

export type BoardData = {
  id: string;
  userId: string;
  invitedUsersIds: string[];
  name: string;
  hash: string;
};

export type BoardFullData = BoardData & { columns: ColumnData[] };

export type Board = {
  readonly setUserId: (newUserId: string) => Promise<void>;
  readonly setInvitedUsersIds: (newInvitedUsersIds: string[]) => Promise<void>;
  readonly setName: (newName: string) => void;
  readonly getUserId: () => string;
  readonly getInvitedUsersIds: () => string[];
  readonly getName: () => string;
  readonly getHash: () => string;
};

export type BoardRepository = {
  readonly get: (userId: string) => Promise<BoardData[]>;
  readonly count: (userId: string) => Promise<number>;
  readonly findById: (boardId: string) => Promise<BoardData | null>;
  readonly save: (boardData: {
    userId: string;
    invitedUsersIds: string[];
    name: string;
    hash: string;
  }) => Promise<BoardData>;
};

export default function buildMakeBoard({
  generateId,
  boardRepository,
  userRepository,
}: BoardFactoryDependencies): BoardFactory {
  return async function makeBoard(boardId?: string): Promise<Board> {
    let boardUserId: string;
    let boardInvitedUsersIds: string[] = [];
    let boardName: string;
    let boardHash: string = generateId();

    if (boardId) {
      const board = await boardRepository.findById(boardId);
      if (!board) throw new Error('Board not found');

      boardUserId = board.userId;
      boardInvitedUsersIds = board.invitedUsersIds;
      boardName = board.name;
      boardHash = board.hash;
    }

    return {
      async setUserId(newUserId): Promise<void> {
        if (newUserId === boardUserId) return;

        if (!newUserId) throw new Error('User ID must be provided');

        const user = await userRepository.findById(newUserId);
        if (!user) throw new Error('User does not exist');

        boardUserId = newUserId;
      },
      async setInvitedUsersIds(newInvitedUsersIds): Promise<void> {
        const distinctInvitedUsersIds = newInvitedUsersIds.filter(
          id => !boardInvitedUsersIds.includes(id)
        );
        const promises = distinctInvitedUsersIds.map(async userId => {
          const user = await userRepository.findById(userId);
          if (!user) throw new Error(`User with ID "${userId}" does not exist`);
        });

        await Promise.all(promises);

        boardInvitedUsersIds = newInvitedUsersIds;
      },
      setName(newName): void {
        if (!newName) throw new Error('Name must be provided');
        boardName = newName;
      },
      getUserId(): string {
        return boardUserId;
      },
      getInvitedUsersIds(): string[] {
        return boardInvitedUsersIds;
      },
      getName(): string {
        return boardName;
      },
      getHash(): string {
        return boardHash;
      },
    };
  };
}
