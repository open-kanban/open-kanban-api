import { CardData, CardRepository, CardFactory } from '../../../entities/card';
import { Authentication } from '../../users/authentication';

export type UpdateCardDependencies = {
  cardRepository: CardRepository;
  makeCard: CardFactory;
};

export type UpdateCard = (params: {
  authentication: Authentication;
  cardId: string;
  cardData: {
    columnId: string;
    name: string;
    description: string;
  };
}) => Promise<CardData>;

export default function makeUpdateCard({
  cardRepository,
  makeCard,
}: UpdateCardDependencies): UpdateCard {
  return async function updateCard({ authentication, cardId, cardData }): Promise<CardData> {
    const userId = authentication.authenticate();
    const card = await makeCard(cardId);
    await card.setColumnId(cardData.columnId);
    card.setName(cardData.name);
    card.setDescription(cardData.description);

    const isAuthorized = await card.canBeManipulatedByUser(userId);
    if (!isAuthorized) throw new Error('Not authorized');

    return await cardRepository.update(cardId, {
      columnId: card.getColumnId(),
      name: card.getName(),
      description: card.getDescription(),
    });
  };
}
