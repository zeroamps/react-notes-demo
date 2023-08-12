import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NoteDetail } from './NoteDetail';
import { Note } from './domains';

export function NoteList() {
  const [notes, setNotes] = useState([] as Note[]);

  function handleCreateNote() {
    setNotes((notes) => [...notes, { id: uuidv4(), value: '' }]);
  }

  function handleUpdateNote(id: string, value: string) {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id === id) {
          note.value = value;
        }
        return note;
      })
    );
  }

  function handleDeleteNote(id: string) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
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
