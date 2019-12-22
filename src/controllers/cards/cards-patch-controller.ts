import { Controller, HttpResponse } from '..';
import { CardData } from '../../app/entities/card';
import { UpdateCard } from '../../app/use-cases/cards/update-card';

export type PatchCardsControllerDependencies = {
  updateCard: UpdateCard;
};

export default function makeCardsPatchController({
  updateCard,
}: PatchCardsControllerDependencies): Controller {
  return async function cardsPatchController({ body, params }): Promise<HttpResponse> {
    const { cardId } = params;
    const cardData = body as CardData;

    try {
      const card = await updateCard(cardId, cardData);
      return {
        statusCode: 201,
        body: { card },
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          error: error.message,
        },
      };
    }
  };
}
