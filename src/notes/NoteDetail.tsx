import { useState } from 'react';
import { Note } from './domains';

export function NoteDetail({
  note,
  onUpdate,
  onDelete
}: {
  note: Note;
  onUpdate: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}) {
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

        <button className="rounded-lg bg-red-900 px-3 py-1 text-xs text-white" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>

      {editing ? (
        <textarea
          className="w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What is your new note?"></textarea>
      ) : (
        <p className="p-3">{note.value.length === 0 ? 'What is your new note?' : note.value}</p>
      )}
    </div>
  );
}
