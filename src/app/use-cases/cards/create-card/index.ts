import { cardModel } from '../../../../models';
import makeCard from '../../../entities/card';
import makeCreateCard from './create-card';

const createCard = makeCreateCard({ cardModel, makeCard });

export default createCard;
export * from './create-card';

