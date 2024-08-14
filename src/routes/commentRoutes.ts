import express from 'express';
import * as commentController from '../controllers/commentController';

//create a router for comments routes
const router = express.Router();

//routes for comments
export default (db: any) => {
    router.get('/:suggestionId', (req, res) => commentController.getComments(db, req, res));
    router.post('/:suggestionId', (req, res) => commentController.createComment(db, req, res));
    router.delete('/:id', (req, res) => commentController.deleteComment(db, req, res));

    return router;
};