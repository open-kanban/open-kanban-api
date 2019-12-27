import { CardData, CardFactory, CardRepository } from '../../../entities/card';
import { Authentication } from '../../users/authentication';

export type CreateCardDependencies = {
  makeCard: CardFactory;
  cardRepository: CardRepository;
};

export type CreateCard = (cardData: {
  authentication: Authentication;
  columnId: string;
  name: string;
  description: string;
}) => Promise<CardData>;

export default function makeCreateCard({
  makeCard,
  cardRepository,
}: CreateCardDependencies): CreateCard {
  return async function createCard({
    authentication,
    columnId,
    name,
    description,
  }): Promise<CardData> {
    const userId = authentication.authenticate();
    const card = await makeCard();
    await card.setColumnId(columnId);
    card.setName(name);
    card.setDescription(description);

    const isAuthorized = await card.canBeManipulatedByUser(userId);
    if (!isAuthorized) throw new Error('Not authorized');

    return await cardRepository.save({
      columnId: card.getColumnId(),
      name: card.getName(),
      description: card.getDescription(),
    });
  };
}
