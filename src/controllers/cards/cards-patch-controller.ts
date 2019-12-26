import { Controller, HttpResponse } from '..';
import { CardData } from '../../app/entities/card';
import { UpdateCard } from '../../app/use-cases/cards/update-card';
import makeJWTAuthentication from '../../app/use-cases/users/authentication/jwt-authentication';

export type PatchCardsControllerDependencies = {
  updateCard: UpdateCard;
};

export default function makeCardsPatchController({
  updateCard,
}: PatchCardsControllerDependencies): Controller {
  return async function cardsPatchController({ body, params, authData }): Promise<HttpResponse> {
    const { jwt } = authData;
    const authentication = makeJWTAuthentication(jwt);
    const { cardId } = params;
    const cardData = body as CardData;

    try {
      const card = await updateCard({ authentication, cardId, cardData });
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
