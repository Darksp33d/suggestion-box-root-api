import express from 'express';
import cors from 'cors';
import { setupDb } from './db';
import suggestionRoutes from './routes/suggestionRoutes';
import commentRoutes from './routes/commentRoutes';

//create an express app
const app = express();
//set the port to 3001
const port = 3001;

//use cors middleware for cross-origin requests (super basic) and json middleware for parsing json requests
app.use(cors());
app.use(express.json());

//setup the database and start the server
let db: any;

//use the setupDb function to setup the database and then start the server
(async () => {
  db = await setupDb();
  
  //use the suggestion and comment routes with the database object exported from db.ts
  app.use('/api/suggestions', suggestionRoutes(db));
  app.use('/api/comments', commentRoutes(db));


  //start the server on the specified port and log a message to the console
  app.listen(port, () => {
    console.log(`The Server is running at http://localhost:${port}, you better catch it!`);
  });
})();