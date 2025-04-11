import React, { useState } from "react";

export default function NotesList({ notes, selectedCategory, onAddNote, onSelectNote }) {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-panel">
      {selectedCategory && (
      <div className="mb-4">
      <div className="note-header">
  <button
    onClick={() => {
      onAddNote(newNoteTitle, newNoteContent);
      setNewNoteTitle("");
      setNewNoteContent("");
    }}
    className="button createnote"
  >
    <span>Create Note</span>
    <span className="plus-icon">+</span>
  </button>
  <div className="input-wrapper">
    <img
      src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
      alt="search-icon"
      className="search-icon-img"
    />
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="input"
    />
  </div>
</div>
    </div>
      )}
      {filteredNotes.map((note, idx) => (
        <div
          key={idx}
          onClick={() => onSelectNote(note)}
          className="note-item"
        >
          <strong>{note.title}</strong>
          <p className="note-preview">{note.content}</p>
        </div>
      ))}
    </div>
  );
}
