import bodyParser from 'body-parser';
import express from 'express';
import { getBoards, postBoards } from '../controllers/boards';
import makeExpressCallback from '../controllers/express-callback-adapter';
import { postLogin } from '../controllers/login';
import { postUsers, getUser } from '../controllers/users';
import { withAuthentication } from '../middlewares';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', makeExpressCallback(postLogin));
app.post('/users', makeExpressCallback(postUsers));
app.get('/users/:userId', withAuthentication, makeExpressCallback(getUser));
app.get('/users/:userId/boards', withAuthentication, makeExpressCallback(getBoards));
app.post('/users/:userId/boards', withAuthentication, makeExpressCallback(postBoards));

export default app;
