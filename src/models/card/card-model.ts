import { Document, model, Schema } from 'mongoose';
import { CardData } from '../../app/entities/card';
import { CardModel } from '../../app/use-cases/cards';

export interface CardDocument extends Document {
  columnId: string;
  name: string;
  description: string;
}

const cardSchema = new Schema({
  columnId: Schema.Types.ObjectId,
  name: String,
  description: String,
});

export const Card = model<CardDocument>('Card', cardSchema);

export default function makeCardModel(): CardModel {
  return {
    save: async function save({
      columnId,
      name,
      description,
    }: CardData): Promise<Required<CardData>> {
      const card = await Card.create({ columnId, name, description });

      return {
        id: card._id,
        columnId: card.columnId,
        name: card.name,
        description: card.description,
      };
    },
  };
}
