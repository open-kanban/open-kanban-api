import bodyParser from 'body-parser';
import express from 'express';
import controllers from '../controllers';
import makeExpressCallback from '../controllers/express-callback-adapter';
import { withAuthentication } from '../middlewares';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', makeExpressCallback(controllers.login.post));
app.post('/users', makeExpressCallback(controllers.users.post));
app.get('/users/:userId', withAuthentication, makeExpressCallback(controllers.users.get));
app.get('/users/:userId/boards', withAuthentication, makeExpressCallback(controllers.boards.get));
app.post('/users/:userId/boards', withAuthentication, makeExpressCallback(controllers.boards.post));
app.post(
  '/users/:userId/boards/:boardId/columns',
  withAuthentication,
  makeExpressCallback(controllers.columns.post)
);
app.post('/cards', withAuthentication, makeExpressCallback(controllers.cards.post));
app.patch('/cards/:cardId', withAuthentication, makeExpressCallback(controllers.cards.patch));

export default app;
