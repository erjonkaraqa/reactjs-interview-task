import React, { useState } from "react";

export default function CategoryList({ data, selectedCategory, onSelectCategory, onAddCategory }) {
  const [newCategory, setNewCategory] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);


  return (
    <div className="category-panel">
      <div className="mb-4">
       
        <button onClick={() => { onAddCategory(newCategory); setNewCategory(""); }} className="button createcategory">
  <span>Create Category</span>
  <span className="plus-icon">+</span>
</button>
      </div>
      {Object.keys(data).map((category, i) => (
        <div key={i} className="mb-2">
        <button
          onClick={() => {
            onSelectCategory(category);
            setExpandedCategory((prev) => (prev === category ? null : category));
          }}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
        >
          <div className="left-section">
            <i className="fas fa-folder folder-icon"></i>
            <span className="category-name">
              {category} <span className="count">({data[category].length})</span>
            </span>
          </div>
          <i
            className={`fa-solid fa-play arrow-icon ${
              expandedCategory === category ? 'rotated' : ''
            }`}
          ></i>
        </button>
      </div>
      
      ))}
    </div>
  );
}
