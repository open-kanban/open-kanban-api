import app from './server';
import { connectToDatabase } from './database';

const port = 3000;

connectToDatabase().then(() => {
  app.listen(port, () => console.log(`Open-Kanban app listening on port ${port}!`));
});
