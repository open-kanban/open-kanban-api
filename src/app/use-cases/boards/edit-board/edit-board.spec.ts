// import { getFakeBoardData, makeFakeBoard } from '../../../__tests__/fixtures/board';
// import makeEditBoard, { EditBoard } from './edit-board';

// describe('Create board', () => {
//   const validBoardData = getFakeBoardData();
//   const editBoardDependencies = {
//     boardDatabase: {
//       findById: jest.fn(),
//       update: jest.fn(),
//     },
//     makeBoard: jest.fn(),
//   };
//   let editBoard: EditBoard;
//   let fakeBoard: ReturnType<typeof makeFakeBoard>;

//   beforeEach(() => {
//     jest.clearAllMocks();

//     fakeBoard = makeFakeBoard();
//     fakeBoard.getId.mockReturnValue('validId');
//     fakeBoard.getUserId.mockReturnValue('validUserId');
//     fakeBoard.getInvitedUsersIds.mockReturnValue('validInvitedUsersIds');
//     fakeBoard.getName.mockReturnValue('validName');

//     editBoardDependencies.boardDatabase.findById.mockResolvedValue(fakeBoard);
//     editBoardDependencies.boardDatabase.update.mockResolvedValue(validBoardData);
//     editBoardDependencies.makeBoard.mockReturnValue(fakeBoard);
//     editBoard = makeEditBoard(editBoardDependencies);
//   });

//   it('resolves with the updated board', async () => {
//     await expect(editBoard('boardId', { name: 'newName' })).resolves.toMatchObject(validBoardData);
//   });

//   it('updates the board with the validated data', async () => {
//     fakeBoard.getId.mockReturnValue('validatedId');
//     fakeBoard.getName.mockReturnValue('validatedName');
//     editBoardDependencies.makeBoard.mockReturnValue(fakeBoard);

//     await editBoard('boardId', { name: 'newName' });
//     await expect(editBoardDependencies.boardDatabase.update).toHaveBeenCalledWith('validatedId', {
//       name: 'validatedName',
//     });
//   });

//   // it('validates the given board data', async () => {
//   //   await editBoard('boardId', { name: 'newName' });
//   //   expect(editBoardDependencies.makeBoard).toHaveBeenCalledWith({
//   //     id: 'boardId',
//   //     name: 'newName',
//   //   });
//   // });


//   it('rejects with error when board validation fails', async () => {
//     editBoardDependencies.makeBoard.mockImplementation(() => {
//       throw new Error('Validation error');
//     });
//     await expect(editBoard('boardId', { name: 'newName' })).rejects.toThrow('Validation error');
//   });

//   it('rejects with the reason if the board does not exist', async () => {
//     fakeBoard.getId.mockReturnValue('validatedId');
//     editBoardDependencies.boardDatabase.findById.mockResolvedValue(null);
//     await expect(editBoard('boardId', { name: 'newName' })).rejects.toThrow('Board not found');
//     expect(editBoardDependencies.boardDatabase.findById).toHaveBeenCalledWith('validatedId')
//   });



//   // it('resolves with the created board data if board was successfully created', async () => {
//   //   editBoardDependencies.boardDatabase.insert.mockResolvedValue('created board data');
//   //   await expect(editBoard(validBoardData)).resolves.toEqual('created board data');
//   // });

//   // it('resolves with the found board data if board already exists', async () => {
//   //   fakeBoard.getId.mockReturnValue('mockId');
//   //   editBoardDependencies.boardDatabase.findById.mockResolvedValue('found data');
//   //   await expect(editBoard(validBoardData)).resolves.toEqual('found data');
//   //   await expect(editBoardDependencies.boardDatabase.findById).toHaveBeenCalledWith('mockId');
//   // });

//   // it('rejects with error if board creation throws', async () => {
//   //   editBoardDependencies.makeBoard.mockImplementation(() => {
//   //     throw new Error('Error');
//   //   });
//   //   await expect(editBoard(validBoardData)).rejects.toThrow('Error');
//   // });

//   // it('rejects with error if board insertion throws', async () => {
//   //   editBoardDependencies.boardDatabase.insert.mockRejectedValue('Error');
//   //   await expect(editBoard(validBoardData)).rejects.toEqual('Error');
//   // });
// });

it('passes', () => {

});
