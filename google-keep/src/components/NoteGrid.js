import React from 'react';
import Note from './Note';

function NoteGrid({ notes, onEdit, onDelete }) {
  return (
    <div className="note-grid">
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NoteGrid;