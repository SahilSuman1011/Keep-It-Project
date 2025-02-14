import React, { useState, useEffect } from 'react';

function NoteForm({ onSubmit, editingNote, onUpdate, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (editingNote) {
      onUpdate(editingNote.id, { title, content });
    } else {
      onSubmit({ title, content });
    }
    setTitle('');
    setContent('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-title"
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-content"
      />
      <div className="form-actions">
        {editingNote && (
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        )}
        <button type="submit" className="submit-button">
          {editingNote ? 'Update' : 'Add Note'}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
