import { useRef } from 'react';
import { Note } from '../domains';

type Props = {
  note: Note;
  onDelete: (id: string) => void;
};

export function DeleteNoteButton({ note, onDelete }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  function handleYes() {
    onDelete(note.id);
    if (dialog.current) dialog.current.close();
  }

  return (
    <>
      <button
        className="rounded-lg bg-red-900 px-3 py-1 text-xs text-white"
        onClick={() => dialog.current && dialog.current.showModal()}>
        Delete
      </button>
      <dialog ref={dialog} className="rounded-lg border p-8">
        <p className="font-semibold">Do you really want to delete it?</p>
        <div className="mt-3 flex justify-center gap-1">
          <button className="rounded-lg bg-green-900 px-3 py-1 text-white" onClick={handleYes}>
            Yes
          </button>
          <button
            className="rounded-lg bg-gray-600 px-3 py-1 text-white"
            onClick={() => dialog.current && dialog.current.close()}>
            No
          </button>
        </div>
      </dialog>
    </>
  );
}
