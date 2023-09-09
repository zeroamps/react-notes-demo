import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DeleteNoteButton } from './DeleteNoteButton';
import { Note } from '../domains';

type Props = {
  note: Note;
  onUpdate: (id: string, value: string) => void;
  onDelete: (id: string) => void;
};

export function NoteDetail({ note, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(note.value);

  function handleSave() {
    onUpdate(note.id, value);
    setEditing(false);
  }

  function handleCancel() {
    setValue(note.value);
    setEditing(false);
  }

  return (
    <div className="relative m-3 rounded-lg bg-yellow-200 p-3 pt-10">
      <div className="absolute right-3 top-3 flex gap-1">
        {editing ? (
          <>
            <button className="rounded-lg bg-blue-900 px-3 py-1 text-xs text-white" onClick={() => handleSave()}>
              Save
            </button>
            <button className="rounded-lg bg-gray-600 px-3 py-1 text-xs text-white" onClick={() => handleCancel()}>
              Cancel
            </button>
          </>
        ) : (
          <button className="rounded-lg bg-blue-900 px-3 py-1 text-xs text-white" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
        <DeleteNoteButton note={note} onDelete={onDelete} />
      </div>

      {editing ? (
        <textarea
          className="w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What is your new note?"></textarea>
      ) : (
        <div className="prose-sm p-3">
          {note.value.length === 0 ? 'What is your new note?' : <ReactMarkdown>{note.value}</ReactMarkdown>}
        </div>
      )}

      <div className="text-right text-xs text-gray-600">{note.changed.toLocaleString()}</div>
    </div>
  );
}
