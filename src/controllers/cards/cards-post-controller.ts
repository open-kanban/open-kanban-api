import { Controller, HttpResponse } from '..';
import { CardData } from '../../app/entities/card';
import { CreateCard } from '../../app/use-cases/cards/create-card/create-card';
import makeJWTAuthentication from '../../app/use-cases/users/authentication/jwt-authentication';

export type PostCardsControllerDependencies = {
  createCard: CreateCard;
};

export default function makeCardsPostController({
  createCard,
}: PostCardsControllerDependencies): Controller {
  return async function cardsPostController({ body, authData }): Promise<HttpResponse> {
    const { jwt } = authData;
    const authentication = makeJWTAuthentication(jwt);
    const cardData = body as CardData;

    try {
      const card = await createCard({ authentication, ...cardData });
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
