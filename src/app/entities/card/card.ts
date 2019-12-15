export type CardFactoryDependencies = {
  generateId: () => string;
};

export type CardFactory = (cardData: CardData) => Card;

export type CardData = {
  readonly id?: string;
  readonly columnId: string;
  readonly name: string;
  readonly description: string;
};

export type Card = {
  readonly getId: () => string;
  readonly getColumnId: () => string;
  readonly getName: () => string;
  readonly getDescription: () => string;
};

export default function buildMakeCard({ generateId }: CardFactoryDependencies): CardFactory {
  return function makeCard({
    id = generateId(),
    columnId,
    name,
    description = '',
  }: CardData): Card {
    if (!columnId) throw new Error('Card column ID must be provided');
    if (!name) throw new Error('Card name must be provided');

    return {
      getId: () => id,
      getColumnId: () => columnId,
      getName: () => name,
      getDescription: () => description,
    };
  };
}
