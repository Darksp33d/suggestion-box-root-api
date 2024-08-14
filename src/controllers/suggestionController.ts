import { Request, Response } from 'express';

//function to get all suggestions
export const getAllSuggestions = async (db: any, req: Request, res: Response) => {
  try {
    const suggestions = await db.all('SELECT * FROM suggestions ORDER BY createdAt DESC');
    res.json(suggestions);
  } catch (error) {
    console.error('Error getting suggestions:', error);
    res.status(500).json({ error: 'Failed to retrieve suggestions' });
  }
};

//function to get a suggestion
export const getSuggestion = async (db: any, req: Request, res: Response) => {
  try {
    const suggestion = await db.get('SELECT * FROM suggestions WHERE id = ?', req.params.id);
    if (suggestion) {
      res.json(suggestion);
    } else {
      res.status(404).json({ error: 'Suggestion not found' });
    }
  } catch (error) {
    console.error('Error getting suggestion:', error);
    res.status(500).json({ error: 'Failed to retrieve suggestion' });
  }
};

//function to create a suggestion and return the new suggestion as JSON
export const createSuggestion = async (db: any, req: Request, res: Response) => {
  try {
    const { title, description, author } = req.body;
    const createdAt = new Date().toISOString();
    const result = await db.run(
      'INSERT INTO suggestions (title, description, author, createdAt) VALUES (?, ?, ?, ?)',
      [title, description, author, createdAt]
    );
    const newSuggestion = await db.get('SELECT * FROM suggestions WHERE id = ?', result.lastID);
    res.status(201).json(newSuggestion);
  } catch (error) {
    console.error('Error creating suggestion:', error);
    res.status(500).json({ error: 'Failed to create suggestion' });
  }
};

//function to delete a suggestion as well as its comments
export const deleteSuggestion = async (db: any, req: Request, res: Response) => {
  try {
    const suggestionId = req.params.id;
    const result = await db.run('DELETE FROM suggestions WHERE id = ?', suggestionId);
    
    //check if the suggestion was deleted and delete the comments for the suggestion
    if (result.changes > 0) {
      await db.run('DELETE FROM comments WHERE suggestionId = ?', suggestionId);
      res.status(200).json({ message: 'Suggestion and comments deleted successfully' });
    } else {
      res.status(404).json({ error: 'Suggestion not found' });
    }
  } catch (error) {
    console.error('Error deleting suggestion:', error);
    res.status(500).json({ error: 'Failed to delete suggestion' });
  }
};