import express from 'express';
import * as suggestionController from '../controllers/suggestionController';

//create a router for suggestions routes
const router = express.Router();

//routes for suggestions
export default (db: any) => {
  router.get('/', (req, res) => suggestionController.getAllSuggestions(db, req, res));
  router.get('/:id', (req, res) => suggestionController.getSuggestion(db, req, res));
  router.post('/', (req, res) => suggestionController.createSuggestion(db, req, res));
  router.delete('/:id', (req, res) => suggestionController.deleteSuggestion(db, req, res));
  
  return router;
};