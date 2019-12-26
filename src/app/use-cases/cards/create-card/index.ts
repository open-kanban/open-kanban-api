import { cardRepository } from '../../../../repositories';
import makeCard from '../../../entities/card';
import makeCreateCard from './create-card';

const createCard = makeCreateCard({ cardRepository, makeCard });

export * from './create-card';
export default createCard;
