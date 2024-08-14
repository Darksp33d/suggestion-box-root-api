# Saeed's Suggestion Box API

This is the backend API for my Suggestion Box web app. It's built with Node.js and Express, using SQLite as the database.

## Technology Stack

- **Node.js**: JavaScript runtime for executing server-side code.
- **Express**: Web application framework for Node.js.
- **SQLite**: Locally stored database.
- **sqlite3**: SQLite driver for Node.js.

## Features

- CRUD operations for suggestions
- CRUD operations for comments (except update, no editing functionality yet)
- Database setup and initialization

## API Endpoints

### Suggestions

- `GET /api/suggestions`: Get all suggestions
- `GET /api/suggestions/:id`: Get a specific suggestion
- `POST /api/suggestions`: Create a new suggestion
- `DELETE /api/suggestions/:id`: Delete a suggestion and its comments

### Comments

- `GET /api/comments/:suggestionId`: Get all comments for a specific suggestion
- `POST /api/comments/:suggestionId`: Create a new comment for a suggestion
- `DELETE /api/comments/:id`: Delete a comment

## Installation

To get the API up and running:

1. Clone the repository.

2. Install the dependencies:
   ```
   npm install
   ```

3. Build the app:
   ```
   npm run build
   ```

## Running the API

After installation, you can start the API server using:

```
npm start
```

This will start the server on `http://localhost:3001`.

## Database

The API uses SQLite, which is a file-based database. The database file (`database.sqlite`) will be created automatically when you first run the server. No additional setup is required. This file will persist after starting/stopping the app. If you want a clean database, you can just delete the file, and on the next startup a new one will be created with empty tables.

## Future Considerations

If I were to actually this API for prod use, I'd:

- Implement user authentication and authorization
- Add input validation and sanitization
- Implement more robust error handling and logging
- Add unit and integration tests
- Implement rate limiting and other security
- Add pagination for optimization