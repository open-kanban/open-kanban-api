import { CardData } from '../../entities/card';

export type CardModel = {
  // findById: (cardId: string) => Promise<Required<CardData> | null>;
  update: (cardId: string, cardData: Partial<CardData>) => Promise<Required<CardData>>;
  save: (cardData: CardData) => Promise<Required<CardData>>;
  // delete: (cardId: string) => Promise<boolean>;
};
