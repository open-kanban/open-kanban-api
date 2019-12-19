import { connectToDatabase } from './database';
import app from './server';

const port = 3000;

connectToDatabase().then(() => {
  app.listen(port, () => console.log(`Open-Kanban app listening on port ${port}!`));
});
