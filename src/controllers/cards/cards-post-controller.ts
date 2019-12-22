import { Controller, HttpResponse } from '..';
import { CardData } from '../../app/entities/card';
import { CreateCard } from '../../app/use-cases/cards/create-card/create-card';

export type PostCardsControllerDependencies = {
  createCard: CreateCard;
};

export default function makeCardsPostController({
  createCard,
}: PostCardsControllerDependencies): Controller {
  return async function cardsPostController({ body, authData }): Promise<HttpResponse> {
    const cardData = body as CardData;
    const { userId } = authData;

    try {
      const card = await createCard({ userId, ...cardData });
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
