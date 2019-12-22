import createCard from '../../app/use-cases/cards/create-card';
import updateCard from '../../app/use-cases/cards/update-card';
import makeCardsPatchController from './cards-patch-controller';
import makeCardsPostController from './cards-post-controller';

const cardsController = {
  post: makeCardsPostController({ createCard }),
  patch: makeCardsPatchController({ updateCard }),
};

export default cardsController;
