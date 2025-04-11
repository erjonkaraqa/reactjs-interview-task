// App.jsx
import React, { useState } from "react";
import CategoryList from "./components/CetegoryList";
import NotesList from "./components/NotesList";
import NoteDetail from "./components/NoteDetail";
import "./App.css";

const initialData = {
  "Category 1": [
    { title: "Note 1", content: "This is the content of Note 1" }
  ],
  "Category 2": [
    { title: "Note A", content: "This is the content of Note A" },
    { title: "Note B", content: "This is the content of Note B" }
  ]
};


export default function NotesApp() {
  const [data, setData] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
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
    }
    setShowNoteModal(false);
  };

  const handleSaveNote = (updatedNote) => {
    const updatedNotes = data[selectedCategory].map((note) =>
      note.title === selectedNote.title && note.content === selectedNote.content ? updatedNote : note
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

  return (
    <div>
  <div className="topbar">
  <span>{confirmedTodoTitle || "Your Notes"}</span>

  <button className="close-btn" onClick={() => setShowTodoScreen(true)}>✖</button>
</div>

    <div className="app-container">
      <CategoryList
        data={data}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedNote(null);
        }}
        onAddCategory={() => setShowCategoryModal(true)}
      />

      <NotesList
        notes={data[selectedCategory] || []}
        onAddNote={() => setShowNoteModal(true)} 
        onSelectNote={(note) => setSelectedNote(note)}
        selectedCategory={selectedCategory}
      />

<NoteDetail
  note={selectedNote}
  onSaveNote={handleSaveNote}
  onDeleteNote={handleDeleteNote}
/>
      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Category</h2>
            <input
              type="text"
              placeholder="New Category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className="modal-buttons">
              <button
                className="confirm"
                onClick={() => {
                  if (newCategoryName) {
                    handleAddCategory(newCategoryName);
                    setNewCategoryName("");
                  }
                }}
              >
                ✔
              </button>
              <button className="cancel" onClick={() => setShowCategoryModal(false)}>
                ✖
              </button>
            </div>
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


      {showNoteModal && (
        <div className="modal-overlay">
          <div className="modal">
          <h2>Create New Note</h2>
            <input type="text" placeholder="Note Title" id="noteTitle" />
            <textarea placeholder="Note Content" id="noteContent"></textarea>
            <div className="modal-buttons">
              <button
                className="confirm"
                onClick={() => {
                  const title = document.getElementById("noteTitle").value;
                  const content = document.getElementById("noteContent").value;
                  handleAddNote(title, content);
                }}
              >
                ✔
              </button>
              <button className="cancel" onClick={() => setShowNoteModal(false)}>
                ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
