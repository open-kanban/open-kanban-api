import { getCardRepositoryMock, getFakeCardData } from '../../../../__tests__/fixtures/card';
import { getColumnRepositoryMock, getFakeColumnData } from '../../../../__tests__/fixtures/column';
import buildMakeCard, { Card, CardFactory } from './card';

describe('Card factory', () => {
  const cardFactoryDependencies = {
    cardRepository: getCardRepositoryMock(),
    columnRepository: getColumnRepositoryMock(),
  };
  const validColumnData = getFakeColumnData();
  const validCardData = getFakeCardData();
  let makeCard: CardFactory;

  beforeEach(() => {
    cardFactoryDependencies.columnRepository.findById.mockResolvedValue(validColumnData);
    cardFactoryDependencies.cardRepository.findById.mockResolvedValue(null);
    makeCard = buildMakeCard(cardFactoryDependencies);
  });

  describe('data validation', () => {
    let card: Card;

    beforeEach(async () => {
      card = await makeCard();
    });

    it('throws if column ID is not provided', async () => {
      await expect(card.setColumnId('')).rejects.toThrow('Card column ID must be provided');
    });

    it('throws if given column does not exist', async () => {
      cardFactoryDependencies.columnRepository.findById.mockResolvedValue(null);
      await expect(card.setColumnId('columnId')).rejects.toThrow('Column does not exist');
      expect(cardFactoryDependencies.columnRepository.findById).toBeCalledWith('columnId');
    });

    it('does not check if column exists if given column ID is the same as current one', async () => {
      await card.setColumnId('columnId');
      jest.clearAllMocks();
      await card.setColumnId('columnId');
      expect(cardFactoryDependencies.columnRepository.findById).not.toBeCalled();
    });

    it('throws if name is not provided', async () => {
      expect(() => card.setName('')).toThrow('Card name must be provided');
    });
  });

  describe('data retrieval', () => {
    let card: Card;

    beforeEach(async () => {
      card = await makeCard();
    });

    it('has the given column id', async () => {
      await card.setColumnId('columnId');
      expect(card.getColumnId()).toEqual('columnId');
    });

    it('has the given name', () => {
      card.setName('name');
      expect(card.getName()).toEqual('name');
    });

    it('has the given description', () => {
      card.setDescription('description');
      expect(card.getDescription()).toEqual('description');
    });
  });

  describe('data retrieval when a card ID is provided', () => {
    beforeEach(async () => {
      cardFactoryDependencies.cardRepository.findById.mockResolvedValue(validCardData);
    });

    it('finds the card data', async () => {
      await makeCard('cardId');
      expect(cardFactoryDependencies.cardRepository.findById).toBeCalledWith('cardId');
    });

    it('rejects if card was not found', async () => {
      cardFactoryDependencies.cardRepository.findById.mockResolvedValue(null);
      await expect(makeCard('cardId')).rejects.toThrow('Card not found');
    });

    it('populates the card column ID from the found card', async () => {
      const card = await makeCard('cardId');
      expect(card.getColumnId()).toEqual(validCardData.columnId);
    });

    it('populates the card name from the found card', async () => {
      const card = await makeCard('cardId');
      expect(card.getName()).toEqual(validCardData.name);
    });

    it('populates the card description from the found card', async () => {
      const card = await makeCard('cardId');
      expect(card.getDescription()).toEqual(validCardData.description);
    });
  });

  describe('authorization', () => {
    describe('canBeManipulatedByUser()', () => {
      it('resolves to true if given user is included in the column board members', async () => {
        cardFactoryDependencies.columnRepository.getBoardMembers.mockResolvedValue([
          'user1',
          'user2',
          'user3',
        ]);
        const card = await makeCard();
        await card.setColumnId('columnId');
        await expect(card.canBeManipulatedByUser('user2')).resolves.toEqual(true);
        expect(cardFactoryDependencies.columnRepository.getBoardMembers).toBeCalledWith('columnId');
      });

      it('resolves to false if given user is not included in the column board members', async () => {
        cardFactoryDependencies.columnRepository.getBoardMembers.mockResolvedValue([
          'user1',
          'user2',
        ]);
        const card = await makeCard();
        await card.setColumnId('columnId');
        await expect(card.canBeManipulatedByUser('user4')).resolves.toEqual(false);
      });
    });
  });
});
