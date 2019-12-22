import {
  getCardModelMock,
  getFakeCardData,
  makeFakeCard,
} from '../../../../../__tests__/fixtures/card';
import makeCreateCard, { CreateCard } from './create-card';

describe('Create card', () => {
  const validCardData = getFakeCardData();
  const fakeCard = makeFakeCard();
  let createCard: CreateCard;
  const createCardDependencies = {
    makeCard: jest.fn(),
    cardModel: getCardModelMock(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    createCard = makeCreateCard(createCardDependencies);
    createCardDependencies.makeCard.mockReturnValue(fakeCard);
    createCardDependencies.cardModel.save.mockResolvedValue(validCardData);
  });

  it('creates a card entity with the given data', async () => {
    await createCard(validCardData);
    expect(createCardDependencies.makeCard).toBeCalledWith({
      columnId: validCardData.columnId,
      name: validCardData.name,
      description: validCardData.description,
    });
  });

  it('saves the created card', async () => {
    await createCard(validCardData);
    expect(createCardDependencies.cardModel.save).toBeCalledWith({
      columnId: fakeCard.getColumnId(),
      name: fakeCard.getName(),
      description: fakeCard.getDescription(),
    });
  });

  it('resolves with the saved card data', async () => {
    const result = createCard(validCardData);
    await expect(result).resolves.toEqual({
      id: validCardData.id,
      columnId: validCardData.columnId,
      name: validCardData.name,
      description: validCardData.description,
    });
  });
});
