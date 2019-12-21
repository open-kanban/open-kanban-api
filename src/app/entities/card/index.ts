import cuid from 'cuid';
import buildMakeCard from './card';

const makeCard = buildMakeCard({ generateId: cuid });

export default makeCard;
export * from './card';

