import { cardRepository, columnRepository } from '../../../repositories';
import buildMakeCard from './card';

const makeCard = buildMakeCard({ columnRepository, cardRepository });

export * from './card';
export default makeCard;
