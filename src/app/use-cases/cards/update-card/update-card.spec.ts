import { getCardModelMock, getFakeCardData } from '../../../../../__tests__/fixtures/card';
import makeUpdateCard, { UpdateCard } from './update-card';

describe('Update card', () => {
  const updateCardDependencies = {
    cardModel: getCardModelMock(),
  };
  let moveCard: UpdateCard;

  beforeEach(() => {
    jest.clearAllMocks();
    moveCard = makeUpdateCard(updateCardDependencies);
  });

  it('updates the given fields of the given card', async () => {
    await moveCard('cardId', {
      columnId: 'newColumnId',
      name: 'newName',
      description: 'newDescription',
    });
    expect(updateCardDependencies.cardModel.update).toBeCalledWith('cardId', {
      columnId: 'newColumnId',
      name: 'newName',
      description: 'newDescription',
    });
  });

  it('resolves with the card data', async () => {
    const updatedCardData = getFakeCardData();
    updateCardDependencies.cardModel.update.mockResolvedValue(updatedCardData);
    await expect(moveCard('cardId', {})).resolves.toEqual(updatedCardData);
  });
});
