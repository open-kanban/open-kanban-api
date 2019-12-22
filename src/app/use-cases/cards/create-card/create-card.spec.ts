import {
  getCardModelMock,
  getFakeCardData,
  makeFakeCard,
} from '../../../../../__tests__/fixtures/card';
import { getUserModelMock } from '../../../../../__tests__/fixtures/user';
import makeCreateCard, { CreateCard } from './create-card';

describe('Create card', () => {
  const validCardData = getFakeCardData();
  const fakeCard = makeFakeCard();
  let createCard: CreateCard;
  const createCardDependencies = {
    makeCard: jest.fn(),
    cardModel: getCardModelMock(),
    userModel: getUserModelMock(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    createCard = makeCreateCard(createCardDependencies);
    createCardDependencies.makeCard.mockReturnValue(fakeCard);
    createCardDependencies.cardModel.save.mockResolvedValue(validCardData);
    createCardDependencies.userModel.isAuthorizedToModifyColumn.mockResolvedValue(true);
  });

  it('throws if user is not authorized to create the card in the given column', async () => {
    createCardDependencies.userModel.isAuthorizedToModifyColumn.mockResolvedValue(false);
    await expect(createCard({ userId: 'userId', ...validCardData })).rejects.toThrow(
      'User is not authorized to modify column'
    );
    expect(createCardDependencies.userModel.isAuthorizedToModifyColumn).toBeCalledWith(
      'userId',
      validCardData.columnId
    );
  });

  it('creates a card entity with the given data', async () => {
    await createCard({ userId: 'userId', ...validCardData });
    expect(createCardDependencies.makeCard).toBeCalledWith({
      columnId: validCardData.columnId,
      name: validCardData.name,
      description: validCardData.description,
    });
  });

  it('saves the created card', async () => {
    await createCard({ userId: 'userId', ...validCardData });
    expect(createCardDependencies.cardModel.save).toBeCalledWith({
      columnId: fakeCard.getColumnId(),
      name: fakeCard.getName(),
      description: fakeCard.getDescription(),
    });
  });

  it('resolves with the saved card data', async () => {
    const result = createCard({ userId: 'userId', ...validCardData });
    await expect(result).resolves.toEqual({
      id: validCardData.id,
      columnId: validCardData.columnId,
      name: validCardData.name,
      description: validCardData.description,
    });
  });
});
