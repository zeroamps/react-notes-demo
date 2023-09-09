import { useEffect } from 'react';
import { NoteDetail } from './NoteDetail';
import { useNotesReducer } from '../hooks/useNotesReducer';

export function NoteList() {
  const [notes, dispatch] = useNotesReducer();

  useEffect(() => {
    dispatch({ type: 'reload' });
  }, [dispatch]);

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
