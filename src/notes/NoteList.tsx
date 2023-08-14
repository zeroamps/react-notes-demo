import { useEffect, useReducer } from 'react';

import { NoteDetail } from './NoteDetail';
import { Note } from './domains';
import { notesReducer } from './notesReducer';

export function NoteList() {
  const [notes, dispatch] = useReducer(notesReducer, [] as Note[]);

  useEffect(() => {
    dispatch({ type: 'reload' });
  }, []);

  function handleCreateNote() {
    dispatch({ type: 'create' });
  }

  function handleUpdateNote(id: string, value: string) {
    dispatch({ type: 'update', id, value });
  }

  function handleDeleteNote(id: string) {
    dispatch({ type: 'delete', id });
  }

  const listOfNotes = notes.map((note) => (
    <NoteDetail key={note.id} note={note} onUpdate={handleUpdateNote} onDelete={handleDeleteNote} />
  ));

  return (
    <div className="container mx-auto">
      <div className="m-3 rounded-lg bg-slate-100 p-3 text-center">
        <button className="rounded-xl bg-green-900 px-12 py-4 text-lg text-white" onClick={() => handleCreateNote()}>
          Create a new note
        </button>
      </div>
      {listOfNotes}
    </div>
  );
}
