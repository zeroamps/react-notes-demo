import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NoteDetail } from './NoteDetail';
import { Note } from './domains';

export function NoteList() {
  const [notes, setNotes] = useState([] as Note[]);

  useEffect(() => {
    const loadedNotes = localStorage.getItem('notes');
    if (loadedNotes) {
      setNotes(JSON.parse(loadedNotes) as Note[]);
    }
  }, []);

  function handleCreateNote() {
    setNotes((notes) => {
      const changedNotes = [...notes, { id: uuidv4(), value: '' }];
      localStorage.setItem('notes', JSON.stringify(changedNotes));
      return changedNotes;
    });
  }

  function handleUpdateNote(id: string, value: string) {
    setNotes((notes) => {
      const changedNotes = notes.map((note) => {
        if (note.id === id) {
          note.value = value;
        }
        return note;
      });
      localStorage.setItem('notes', JSON.stringify(changedNotes));
      return changedNotes;
    });
  }

  function handleDeleteNote(id: string) {
    setNotes((notes) => {
      const changedNotes = notes.filter((note) => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(changedNotes));
      return changedNotes;
    });
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
