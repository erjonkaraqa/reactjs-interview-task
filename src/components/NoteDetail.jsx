import React, { useState, useEffect } from "react";

export default function NoteDetail({ note, onSaveNote, onDeleteNote }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

 
  useEffect(() => {
    if (note) {
      setEditedTitle(note.title);
      setEditedContent(note.content);
    } else {
      setEditedTitle("");
      setEditedContent("");
    }
  }, [note]);

  const handleSave = () => {
    if (onSaveNote && note) {
      onSaveNote({ ...note, title: editedTitle, content: editedContent });
    }
  };

  const handleDelete = () => {
    if (onDeleteNote && note) {
      onDeleteNote(note);
    }
  };

  return (
    <div className="note-detail">
      {note ? (
        <>
          <input
            className="note-title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="note-content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />

<div className="note-actions">
  <button className="button delete" onClick={handleDelete}>
    Delete
    <i className="fa-solid fa-trash trash-icon"></i>
  </button>
  <button className="button save" onClick={handleSave}>
    Save Changes
    <i className="fa-solid fa-check check-icon"></i>
  </button>
</div>

        </>
      ) : (
        <p className="placeholder">Select a note to view its details</p>
      )}
    </div>
  );
}
