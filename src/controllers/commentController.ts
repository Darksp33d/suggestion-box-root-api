import { Request, Response } from 'express';

//function to get all comments
export const getComments = async (db: any, req: Request, res: Response) => {
    //get all comments for a suggestion by suggestionId and order by createdAt in ascending order and return as JSON
    try {
        const comments = await db.all('SELECT * FROM comments WHERE suggestionId = ? ORDER BY createdAt ASC', req.params.suggestionId);
        res.json(comments);
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: 'Failed to get comments' });
    }
};

//function to create a comment
export const createComment = async (db: any, req: Request, res: Response) => {
    //create a new comment for a suggestion by suggestionId and return the new comment as JSON
    try {
        //get the content and author from the request body and the suggestionId from the request parameters
        const { content, author } = req.body;
        const suggestionId = req.params.suggestionId;
        const createdAt = new Date().toISOString();
        //insert the new comment into the database and return the new comment as JSON
        const result = await db.run(
            'INSERT INTO comments (suggestionId, content, author, createdAt) VALUES (?, ?, ?, ?)',
            [suggestionId, content, author, createdAt]
        );
        //get the new comment from the database and return it as JSON
        const newComment = await db.get('SELECT * FROM comments WHERE id = ?', result.lastID);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

//function to delete a comment
export const deleteComment = async (db: any, req: Request, res: Response) => {
    try {
        //delete a comment by id and return a success message if the comment was deleted successfully
        const commentId = req.params.id;
        const result = await db.run('DELETE FROM comments WHERE id = ?', commentId);

        //check if the comment was deleted and return a success message or an error message
        if (result.changes > 0) {
            res.status(200).json({ message: 'Comment was deleted successfully' });
        } else {
            res.status(404).json({ error: 'Comment was not found' });
        }
    } catch (error) {
        console.error('Error deleting comment, error is:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};