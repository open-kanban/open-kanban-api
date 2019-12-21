import { CardModel } from '..';
import { CardData, CardFactory } from '../../../entities/card';

export type CreateCardDependencies = {
  makeCard: CardFactory;
  cardModel: CardModel;
};

export type CreateCard = (cardData: CardData) => Promise<Required<CardData>>;

export default function makeCreateCard({
  makeCard,
  cardModel,
}: CreateCardDependencies): CreateCard {
  return async function createCard({ columnId, name, description }): Promise<Required<CardData>> {
    const card = makeCard({ columnId, name, description });
    const savedCardData = await cardModel.save({
      columnId: card.getColumnId(),
      name: card.getName(),
      description: card.getDescription(),
    });

    return savedCardData;
  };
}
