import { cardModel } from '../../../../models';
import makeUpdateCard from './update-card';

const updateCard = makeUpdateCard({ cardModel });

export default updateCard;
export * from './update-card';
