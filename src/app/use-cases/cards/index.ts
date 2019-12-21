import { CardData } from '../../entities/card';

export type CardModel = {
  save: (cardData: CardData) => Promise<Required<CardData>>;
};
