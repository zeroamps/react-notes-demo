import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toolbar />
    <Notes />
  </React.StrictMode>
);

function Toolbar() {
  return (
    <div className="bg-blue-900 py-3">
      <h1 className="text-center text-5xl font-light uppercase text-white">React Notes Demo</h1>
    </div>
  );
}

interface Note {
  id: string;
  value: string;
}

function Notes() {
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
    <div className="relative m-3 rounded-lg bg-yellow-200 p-3 pt-10" key={note.id}>
      <button
        className="absolute right-3 top-3 rounded-lg bg-red-900 px-3 py-1 text-xs text-white"
        onClick={() => handleDeleteNote(note.id)}>
        Delete
      </button>
      <textarea
        placeholder="What is your new note..."
        className="w-full overflow-hidden border-none bg-yellow-200 outline-none focus:ring-0"
        value={note.value}
        onChange={(e) => handleUpdateNote(note.id, e.target.value)}></textarea>
    </div>
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
