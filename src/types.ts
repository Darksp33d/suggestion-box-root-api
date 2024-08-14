
//type definition for suggestion and comment objects

export interface Suggestion {
    id: number;
    title: string;
    description: string;
    author: string;
    createdAt: string;
  }
  
  export interface Comment {
    id: number;
    suggestionId: number;
    content: string;
    author: string;
    createdAt: string;
  }