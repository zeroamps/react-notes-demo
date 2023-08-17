import { v4 as uuidv4 } from 'uuid';
import { Note } from './domains';

export type NotesReducerAction =
  | { type: 'reload' | 'create' }
  | { type: 'update'; id: string; value: string }
  | { type: 'delete'; id: string };

export function notesReducer(notes: Note[], action: NotesReducerAction) {
  switch (action.type) {
    case 'reload': {
      const loadedNotes = localStorage.getItem('notes');
      if (loadedNotes) {
        return JSON.parse(loadedNotes) as Note[];
      }
      return [];
    }

    case 'create': {
      const changedNotes = [...notes, { id: uuidv4(), value: '' }];
      localStorage.setItem('notes', JSON.stringify(changedNotes));
      return changedNotes;
    }

    case 'update': {
      const changedNotes = notes.map((note) => {
        if (note.id === action.id) {
          note.value = action.value;
        }
        return note;
      });
      localStorage.setItem('notes', JSON.stringify(changedNotes));
      return changedNotes;
    }

    case 'delete': {
      const changedNotes = notes.filter((note) => note.id !== action.id);
      localStorage.setItem('notes', JSON.stringify(changedNotes));
      return changedNotes;
    }
  }
}
