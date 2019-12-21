import createCard from '../../app/use-cases/cards/create-card';
import makeCardsPostController from './cards-post-controller';

const cardsController = {
  post: makeCardsPostController({ createCard }),
};

export default cardsController;
