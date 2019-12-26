import {
  getCardRepositoryMock,
  makeFakeCard,
  getFakeCardData,
} from '../../../../../__tests__/fixtures/card';
import makeUpdateCard, { UpdateCard } from './update-card';

describe('Update card', () => {
  const authenticationMock = { authenticate: jest.fn() };
  const rawCardData = {
    columnId: 'c',
    name: 'n',
    description: 'd',
  };
  const validCard = makeFakeCard();
  const validCardData = getFakeCardData();
  const updateCardDependencies = {
    cardRepository: getCardRepositoryMock(),
    makeCard: jest.fn(),
  };
  let updateCard: UpdateCard;

  beforeEach(() => {
    jest.clearAllMocks();
    updateCard = makeUpdateCard(updateCardDependencies);

    validCard.getColumnId.mockReturnValue('newColumnId');
    validCard.getName.mockReturnValue('newName');
    validCard.getDescription.mockReturnValue('newDescription');

    updateCardDependencies.makeCard.mockResolvedValue(validCard);
    authenticationMock.authenticate.mockReturnValue('userId');
    validCard.canBeManipulatedByUser.mockResolvedValue(true);
    updateCardDependencies.cardRepository.update.mockResolvedValue(validCardData);
  });

  it('authenticates the user with the given authentication', async () => {
    await updateCard({
      authentication: authenticationMock,
      cardId: 'cardId',
      cardData: rawCardData,
    });
    expect(authenticationMock.authenticate).toBeCalledTimes(1);
  });

  it('creates a card entity with the given card ID', async () => {
    await updateCard({
      authentication: authenticationMock,
      cardId: 'cardId',
      cardData: rawCardData,
    });
    expect(updateCardDependencies.makeCard).toBeCalledWith('cardId');
  });

  it('sets the card entity with the given card data', async () => {
    await updateCard({
      authentication: authenticationMock,
      cardId: 'cardId',
      cardData: rawCardData,
    });
    expect(validCard.setColumnId).toBeCalledWith(rawCardData.columnId);
    expect(validCard.setName).toBeCalledWith(rawCardData.name);
    expect(validCard.setDescription).toBeCalledWith(rawCardData.description);
  });

  it('verifies if user is authorized to update the card', async () => {
    await updateCard({
      authentication: authenticationMock,
      cardId: 'cardId',
      cardData: rawCardData,
    });
    expect(validCard.canBeManipulatedByUser).toBeCalledWith('userId');
  });

  it('throws if user is not authorized to update the card', async () => {
    validCard.canBeManipulatedByUser.mockResolvedValue(false);
    const result = updateCard({
      authentication: authenticationMock,
      cardId: 'cardId',
      cardData: rawCardData,
    });
    await expect(result).rejects.toThrow('Not authorized');
  });

  it('updates the card with the given data', async () => {
    await updateCard({
      authentication: authenticationMock,
      cardId: 'cardId',
      cardData: rawCardData,
    });
    expect(updateCardDependencies.cardRepository.update).toBeCalledWith('cardId', {
      columnId: 'newColumnId',
      name: 'newName',
      description: 'newDescription',
    });
  });

  it('resolves with the updated card data', async () => {
    const result = updateCard({
      authentication: authenticationMock,
      cardId: 'cardId',
      cardData: rawCardData,
    });
    await expect(result).resolves.toEqual(validCardData);
  });
});
