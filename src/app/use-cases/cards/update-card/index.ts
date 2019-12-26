import { cardRepository } from '../../../../repositories';
import makeCard from '../../../entities/card';
import makeUpdateCard from './update-card';

const updateCard = makeUpdateCard({ cardRepository, makeCard });

export * from './update-card';
export default updateCard;
