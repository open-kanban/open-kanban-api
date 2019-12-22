import { CardModel } from '..';
import { CardData } from '../../../entities/card';

export type UpdateCardDependencies = {
  cardModel: CardModel;
};

export type UpdateCard = (
  cardId: string,
  cardData: Partial<CardData>
) => Promise<Required<CardData>>;

export default function makeUpdateCard({ cardModel }: UpdateCardDependencies): UpdateCard {
  return async function updateCard(cardId, cardData): Promise<Required<CardData>> {
    const updatedCardData = await cardModel.update(cardId, cardData);
    return updatedCardData;
  };
}
