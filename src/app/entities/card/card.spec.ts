import { getFakeCardData } from '../../../../__tests__/fixtures/card';
import buildMakeCard, { CardFactory } from './card';

describe('Card factory', () => {
  const cardFactoryDependencies = {
    generateId: jest.fn(),
  };
  const validCardData = getFakeCardData();
  let makeCard: CardFactory;

  beforeEach(() => {
    cardFactoryDependencies.generateId.mockReturnValue('123');
    makeCard = buildMakeCard(cardFactoryDependencies);
  });

  it('generates an id', () => {
    cardFactoryDependencies.generateId.mockReturnValue('mockId');
    const validCard = makeCard({ ...validCardData, id: undefined });
    expect(validCard.getId()).toEqual('mockId');
  });

  it('throws if column id is not provided', () => {
    expect(() => makeCard({ ...validCardData, columnId: undefined })).toThrow(
      'Card column ID must be provided'
    );
  });

  it('throws if name is not provided', () => {
    expect(() => makeCard({ ...validCardData, name: undefined })).toThrow(
      'Card name must be provided'
    );
  });

  it('has the given column id', () => {
    const validCard = makeCard({ ...validCardData, columnId: 'columnId' });
    expect(validCard.getColumnId()).toBe('columnId');
  });

  it('has the given name', () => {
    const validCard = makeCard({ ...validCardData, name: 'name' });
    expect(validCard.getName()).toBe('name');
  });

  it('has an empty description if one is not provided', () => {
    const validCard = makeCard({ ...validCardData, description: undefined });
    expect(validCard.getDescription()).toBe('');
  });

  it('has the given description', () => {
    const validCard = makeCard({ ...validCardData, description: 'description' });
    expect(validCard.getDescription()).toBe('description');
  });
});
