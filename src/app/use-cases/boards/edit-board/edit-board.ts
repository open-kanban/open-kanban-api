// import { BoardData, BoardFactory } from '../../entities/board';

// export type EditBoardDependencies = {
//   boardDatabase: {
//     findById: (boardId: string) => Promise<BoardData | null>;
//     update: (boardId: string, boardData: { name: string }) => Promise<BoardData>;
//   };
//   makeBoard: BoardFactory;
// };

// export type EditBoard = (boardId: string, boardData: { name: string }) => Promise<BoardData>;

// export default function makeEditBoard({
//   boardDatabase,
//   makeBoard,
// }: EditBoardDependencies): EditBoard {
//   return async function editBoard(boardId, { name }) {
//     // const board = makeBoard({ id: boardId, name });
//     const existingBoard = await boardDatabase.findById(board.getId());
//     if (!existingBoard) throw new Error('Board not found');

//     return boardDatabase.update(board.getId(), { name: board.getName() });
//   };
// }
