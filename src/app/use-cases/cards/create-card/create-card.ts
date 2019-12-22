import { CardModel } from '..';
import { CardData, CardFactory } from '../../../entities/card';
import { UserModel } from '../../users';

export type CreateCardDependencies = {
  makeCard: CardFactory;
  cardModel: CardModel;
  userModel: UserModel;
};

export type CreateCard = (cardData: CardData & { userId: string }) => Promise<Required<CardData>>;

export default function makeCreateCard({
  makeCard,
  cardModel,
  userModel,
}: CreateCardDependencies): CreateCard {
  return async function createCard({
    userId,
    columnId,
    name,
    description,
  }): Promise<Required<CardData>> {
    const isAuthorized = await userModel.isAuthorizedToModifyColumn(userId, columnId);
    if (!isAuthorized) throw new Error('User is not authorized to modify column');

    const card = makeCard({ columnId, name, description });
    const savedCardData = await cardModel.save({
      columnId: card.getColumnId(),
      name: card.getName(),
      description: card.getDescription(),
    });

    return savedCardData;
  };
}
