import { ColumnRepository } from '../column';

export type CardFactoryDependencies = {
  cardRepository: CardRepository;
  columnRepository: ColumnRepository;
};

export type CardFactory = (cardId?: string) => Promise<Card>;

export type CardData = {
  id: string;
  columnId: string;
  name: string;
  description: string;
};

export type Card = {
  readonly setColumnId: (newColumnId: string) => Promise<void>;
  readonly setName: (newName: string) => void;
  readonly setDescription: (newDescription: string) => void;
  readonly getColumnId: () => string;
  readonly getName: () => string;
  readonly getDescription: () => string;
  readonly canBeCreatedByUser: (userId: string) => Promise<boolean>;
};

export type CardRepository = {
  readonly findById: (cardId: string) => Promise<CardData | null>;
  readonly update: (
    cardId: string,
    cardData: {
      columnId: string;
      name: string;
      description: string;
    }
  ) => Promise<CardData>;
  readonly save: (cardData: {
    columnId: string;
    name: string;
    description: string;
  }) => Promise<CardData>;
};

export default function buildMakeCard({
  cardRepository,
  columnRepository,
}: CardFactoryDependencies): CardFactory {
  return async function makeCard(cardId?: string): Promise<Card> {
    let cardColumnId: string;
    let cardName: string;
    let cardDescription: string;

    if (cardId) {
      const card = await cardRepository.findById(cardId);
      if (!card) throw new Error('Card not found');

      cardColumnId = card.columnId;
      cardName = card.name;
      cardDescription = card.description;
    }

    return {
      async setColumnId(newColumnId): Promise<void> {
        if (newColumnId === cardColumnId) return;

        if (!newColumnId) throw new Error('Card column ID must be provided');
        const column = await columnRepository.findById(newColumnId);
        if (!column) throw new Error('Column does not exist');

        cardColumnId = newColumnId;
      },
      setName(newName): void {
        if (!newName) throw new Error('Card name must be provided');
        cardName = newName;
      },
      setDescription(newDescription): void {
        cardDescription = newDescription;
      },
      getColumnId(): string {
        return cardColumnId;
      },
      getName(): string {
        return cardName;
      },
      getDescription(): string {
        return cardDescription;
      },
      async canBeCreatedByUser(userId): Promise<boolean> {
        const boardMembers = await columnRepository.getBoardMembers(cardColumnId);
        if (!boardMembers.includes(userId)) return false;

        return true;
      },
    };
  };
}
