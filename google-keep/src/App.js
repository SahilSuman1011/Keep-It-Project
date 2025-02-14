import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteGrid from './components/NoteGrid';
import { SiGooglekeep } from "react-icons/si";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadNotes = async () => {
      try {
        // Loading from localStorage first
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }

        // Then fetching from backend
        const response = await fetch(`${API_BASE_URL}/notes`);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const backendNotes = await response.json();
        setNotes(backendNotes);
        localStorage.setItem('notes', JSON.stringify(backendNotes));
      } catch (err) {
        console.error('Error loading notes:', err);
        setError('Failed to load notes. Using local data if available.');
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [setError]);

  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  }, [notes]);

  const createNote = async (noteData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const newNote = await response.json();
      setNotes(prevNotes => [...prevNotes, newNote]);
      setError(null);
    } catch (err) {
      console.error('Error creating note:', err);
      setError('Failed to create note. Please try again.');
      
      // Fallback to local storage
      const newNote = {
        id: Date.now().toString(),
        ...noteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes(prevNotes => [...prevNotes, newNote]);
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      const updatedNote = await response.json();
      setNotes(prevNotes =>
        prevNotes.map(note => (note.id === id ? updatedNote : note))
      );
      setEditingNote(null);
      setError(null);
    } catch (err) {
      console.error('Error updating note:', err);
      setError('Failed to update note. Please try again.');
      
      // Fallback to local update
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === id
            ? {
                ...note,
                ...noteData,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note. Please try again.');
      
      // Fallback to local delete
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div className="header-left">
          <h1><SiGooglekeep /> Keep It</h1>
        </div>
        <div className="header-right">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <MdDarkMode /> : <MdOutlineLightMode />}
          </button>
        </div>
      </header>
      <main className="main">
        <NoteForm 
          onSubmit={createNote}
          editingNote={editingNote}
          onUpdate={updateNote}
          onCancel={() => setEditingNote(null)}
        />
        <NoteGrid 
          notes={notes}
          onEdit={setEditingNote}
          onDelete={deleteNote}
        />
      </main>
    </div>
  );
}

export default App;