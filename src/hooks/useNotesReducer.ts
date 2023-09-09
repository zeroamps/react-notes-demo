import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../domains';

const LOCAL_STORAGE_NOTES_KEY = 'f4cf9eca-2db9-403d-9797-544d864da28f-notes';

type NotesReducerAction =
  | { type: 'reload' | 'create' }
  | { type: 'update'; id: string; value: string }
  | { type: 'delete'; id: string };

export function useNotesReducer() {
  return useReducer(notesReducer, []);
}

function notesReducer(notes: Note[], action: NotesReducerAction) {
  switch (action.type) {
    case 'reload': {
      const loadedNotes = localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
      if (loadedNotes) {
        return JSON.parse(loadedNotes, (key, value) => {
          if (key === 'changed') return new Date(value);
          return value;
        }) as Note[];
      }
      return [];
    }

    case 'create': {
      const changedNotes = [...notes, { id: uuidv4(), value: '', changed: new Date() }];
      localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(changedNotes));
      return changedNotes;
    }

    case 'update': {
      const changedNotes = notes.map((note) => {
        if (note.id === action.id) {
          note.value = action.value;
          note.changed = new Date();
        }
        return note;
      });
      localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(changedNotes));
      return changedNotes;
    }

    case 'delete': {
      const changedNotes = notes.filter((note) => note.id !== action.id);
      localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(changedNotes));
      return changedNotes;
    }
  }
}
