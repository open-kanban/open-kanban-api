import { Document, model, Schema } from 'mongoose';
import { CardData, CardRepository } from '../../app/entities/card';

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

export default function makeCardRepository(): CardRepository {
  return {
    async save({ columnId, name, description }): Promise<CardData> {
      const card = await Card.create({ columnId, name, description });

      return {
        id: card._id,
        columnId: card.columnId,
        name: card.name,
        description: card.description,
      };
    },
    async update(cardId, { columnId, name, description }): Promise<CardData> {
      const cardDocument = await Card.findById(cardId);
      if (!cardDocument) throw new Error('Card not found');

      cardDocument.columnId = columnId;
      cardDocument.name = name;
      cardDocument.description = description;

      const savedCardDocument = await cardDocument.save();

      return {
        id: savedCardDocument._id,
        columnId: savedCardDocument.columnId,
        name: savedCardDocument.name,
        description: savedCardDocument.description,
      };
    },
    async findById(cardId): Promise<CardData | null> {
      const cardDocument = await Card.findById(cardId);
      if (!cardDocument) return null;

      return {
        id: cardDocument._id,
        columnId: cardDocument.columnId,
        name: cardDocument.name,
        description: cardDocument.description,
      };
    },
  };
}
