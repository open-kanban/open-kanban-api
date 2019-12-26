import {
  getCardRepositoryMock,
  getFakeCardData,
  makeFakeCard,
} from '../../../../../__tests__/fixtures/card';
import makeCreateCard, { CreateCard } from './create-card';

describe('Create card', () => {
  const authenticationMock = { authenticate: jest.fn() };
  const validCardData = getFakeCardData();
  const fakeCard = makeFakeCard();
  const rawCardData = {
    columnId: 'c',
    name: 'n',
    description: 'd',
  };
  let createCard: CreateCard;
  const createCardDependencies = {
    makeCard: jest.fn(),
    cardRepository: getCardRepositoryMock(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    createCard = makeCreateCard(createCardDependencies);

    createCardDependencies.makeCard.mockReturnValue(fakeCard);
    createCardDependencies.cardRepository.save.mockResolvedValue(validCardData);
    fakeCard.canBeManipulatedByUser.mockResolvedValue(true);
    authenticationMock.authenticate.mockReturnValue('userId');
  });

  it('authenticates the user with the given authentication', async () => {
    await createCard({ authentication: authenticationMock, ...rawCardData });
    expect(authenticationMock.authenticate).toBeCalledTimes(1);
  });

  it('creates a card entity and sets the given data', async () => {
    await createCard({ authentication: authenticationMock, ...rawCardData });
    expect(createCardDependencies.makeCard).toBeCalledWith();
    expect(fakeCard.setColumnId).toBeCalledWith(rawCardData.columnId);
    expect(fakeCard.setName).toBeCalledWith(rawCardData.name);
    expect(fakeCard.setDescription).toBeCalledWith(rawCardData.description);
  });

  it('checks if authenticated user is authorized to create the card', async () => {
    await createCard({ authentication: authenticationMock, ...rawCardData });
    expect(fakeCard.canBeManipulatedByUser).toBeCalledWith('userId');
  });

  it('throws if user is not authorized to create the card', async () => {
    fakeCard.canBeManipulatedByUser.mockResolvedValue(false);
    const result = createCard({ authentication: authenticationMock, ...rawCardData });
    await expect(result).rejects.toThrow('Not authorized');
  });

  it('saves the created card', async () => {
    await createCard({ authentication: authenticationMock, ...rawCardData });
    expect(createCardDependencies.cardRepository.save).toBeCalledWith({
      columnId: fakeCard.getColumnId(),
      name: fakeCard.getName(),
      description: fakeCard.getDescription(),
    });
  });

  it('resolves with the saved card data', async () => {
    const result = createCard({ authentication: authenticationMock, ...rawCardData });
    await expect(result).resolves.toEqual({
      id: validCardData.id,
      columnId: validCardData.columnId,
      name: validCardData.name,
      description: validCardData.description,
    });
  });
});
