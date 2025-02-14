import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(json());

// In-memory store (replace with database in production)
let notes = [];

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Create a new note
app.post('/api/notes', (req, res) => {
  const note = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.push(note);
  res.status(201).json(note);
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const noteIndex = notes.findIndex(note => note.id === req.params.id);
  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    title: req.body.title,
    content: req.body.content,
    updatedAt: new Date().toISOString(),
  };
  
  res.json(notes[noteIndex]);
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const noteIndex = notes.findIndex(note => note.id === req.params.id);
  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  notes = notes.filter(note => note.id !== req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});