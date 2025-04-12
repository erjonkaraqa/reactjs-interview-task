import React, { useState } from "react";
import CategoryList from "./components/CetegoryList";
import NotesList from "./components/NotesList";
import NoteDetail from "./components/NoteDetail";
import "./App.css";

const initialData = {
  "Category 1": [{ title: "Note 1", content: "This is the content of Note 1" }],
  "Cate43242": [{ title: "Note 1", content: "This is the content of Note 1" }],
  "543566 2": [
    { title: "Note A", content: "This is the content of Note A" },
    { title: "Note B", content: "This is the content of Note B" },
  ],
};

export default function NotesApp() {
  const [data, setData] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [categoryVisibility, setCategoryVisibility] = useState({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState(""); // Add new state for note title
  const [newNoteContent, setNewNoteContent] = useState(""); // Add new state for note content
  const [showTodoScreen, setShowTodoScreen] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [confirmedTodoTitle, setConfirmedTodoTitle] = useState("");
  const handleAddCategory = (newCategory) => {
    if (newCategory && !data[newCategory]) {
      setData({ ...data, [newCategory]: [] });
    }
    setShowCategoryModal(false);
  };

  const handleAddNote = (title, content) => {
    if (selectedCategory && title && content) {
      const updatedNotes = [...data[selectedCategory], { title, content }];
      setData({ ...data, [selectedCategory]: updatedNotes });
      setNewNoteTitle(""); // Reset input after adding the note
      setNewNoteContent(""); // Reset input after adding the note
    }
    setShowNoteModal(false);
  };

  const handleSaveNote = (updatedNote) => {
    const updatedNotes = data[selectedCategory].map((note) =>
      note.title === selectedNote.title && note.content === selectedNote.content
        ? updatedNote
        : note
    );
    setData({ ...data, [selectedCategory]: updatedNotes });
    setSelectedNote(updatedNote);
  };

  const handleDeleteNote = (noteToDelete) => {
    const filteredNotes = data[selectedCategory].filter(
      (note) => note !== noteToDelete
    );
    setData({ ...data, [selectedCategory]: filteredNotes });
    setSelectedNote(null);
  };

  const toggleCategoryVisibility = (category) => {
    setCategoryVisibility((prevVisibility) => ({
      ...prevVisibility,
      [category]: !prevVisibility[category],
    }));
  };

  const onSelectNote = (note) => {
    setSelectedNote((prevNote) => (prevNote === note ? null : note)); 
  };

  return (
    <div className="note-app">
      <div className="topbar">
        <span>{confirmedTodoTitle || "Your Notes"}</span>
        
  <button className="close-btn" onClick={() => setShowTodoScreen(true)}>✖</button>
      </div>

      <div className="app-container">
        <CategoryList
          data={data}
          selectedCategory={selectedCategory}
          categoryVisibility={categoryVisibility}
          onSelectCategory={(category) => {
            setSelectedCategory((prevCategory) => {
              const isSame = prevCategory === category;
              const newCategory = isSame ? null : category;

              // Hide note detail when category is toggled off
              if (isSame) {
                setSelectedNote(null);
              }

              return newCategory;
            });

            toggleCategoryVisibility(category);
          }}
          onAddCategory={() => setShowCategoryModal(true)}
        />

        {categoryVisibility[selectedCategory] && (
          <NotesList
            notes={data[selectedCategory] || []}
            onAddNote={() => setShowNoteModal(true)}
            onSelectNote={onSelectNote}
            selectedCategory={selectedCategory}
          />
        )}

        {selectedNote && (
          <NoteDetail
            note={selectedNote}
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {/* Modal Logic for Creating Category */}
        {showCategoryModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Create New Category</h2>
              <input
                type="text"
                placeholder="New Category"
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button className="confirm" onClick={() => handleAddCategory(newCategoryName)}>
                Create
              </button>
              <button className="cancel" onClick={() => setShowCategoryModal(false)}>Cancel</button>
            </div>
          </div>
        )}
        {showTodoScreen && (
  <div className="white-screen-overlay">
    <div className="todo-modal">
      <input
        type="text"
        placeholder="Add a title..."
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button
        className="btn green"
        onClick={() => {
          if (todoTitle.trim()) {
            setConfirmedTodoTitle(todoTitle); 
            setTodoTitle("");
            setShowTodoScreen(false);
          }
        }}
      >
        ✔
      </button>
      <button
        className="btn red"
        onClick={() => {
          setTodoTitle("");
          setShowTodoScreen(false);
        }}
      >
        ✖
      </button>
    </div>
  </div>
)}

        {/* Modal Logic for Creating Note */}
        {showNoteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Create New Note</h2>
              <input
                type="text"
                placeholder="Note Title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)} // Bind the title input
              />
              <textarea
                placeholder="Note Content"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)} // Bind the content textarea
              ></textarea>
              <button className="confirm" onClick={() => handleAddNote(newNoteTitle, newNoteContent)}>
                Create
              </button>
              <button className="cancel" onClick={() => setShowNoteModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
