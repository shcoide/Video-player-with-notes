import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './notes.css';

const Notes = ({ videoId, currentTime, playerRef }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
    setNotes(savedNotes);
  }, [videoId]);

  const handleAddNote = () => {
    if (!newNote.trim()) {
      setError('Please write something before adding a note.');
      return;
    }
    if (editingNoteId) {
      const updatedNotes = notes.map(note =>
        note.id === editingNoteId ? { ...note, content: newNote } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem(videoId, JSON.stringify(updatedNotes));
      setEditingNoteId(null);
    } else {
      const note = {
        id: uuidv4(),
        time: currentTime,
        content: newNote,
        date: new Date().toLocaleString(),
      };
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    }
    setNewNote('');
    setError('');
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  const handleEditNote = (id, content) => {
    setNewNote(content);
    setEditingNoteId(id);
  };

  const handleTimestampClick = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };

  return (
    <div className='notes'>
      <div className="title">
        <h2>Notes</h2>
        <button className="add_btn end" onClick={handleAddNote}>
          {editingNoteId ? 'Update Note' : 'Add Note'}
        </button>
      </div>
      <input
        type="text"
        value={newNote}
        onChange={(e) => {
          setNewNote(e.target.value);
          setError('');
        }}
        placeholder="Add a note"
      />
      {error && <p className="error">{error}</p>}
      <ul className='list_note'>
        {notes.map(note => (
          <li className='each_note' key={note.id}>
            <p className='time'>
              <strong>{note.date}</strong> 
              <span onClick={() => handleTimestampClick(note.time)}>
                Timespan {Math.floor(note.time / 60)}:{Math.floor(note.time % 60)}
              </span>
            </p>
            <p className='content'>{note.content}</p>
            <div className="bttns">
              <button className='del add_btn' onClick={() => handleDeleteNote(note.id)}>Delete</button>
              <button className='add_btn edit' onClick={() => handleEditNote(note.id, note.content)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
