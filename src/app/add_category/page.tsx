"use client";

import { useState } from "react";

export default function DocumentCategories() {
  const [categories, setCategories] = useState<string[]>([
    "Invoices",
    "Contracts",
    "Reports",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory) {
      alert("Please enter a category name.");
      return;
    }
    if (categories.includes(trimmedCategory)) {
      alert("This category already exists.");
      return;
    }

    setCategories([...categories, trimmedCategory]);
    setNewCategory("");
  };

  const deleteCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }} className="text-black">
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>Document Categories</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          type="submit"
          className="bg-foreground"
          style={{
            padding: "0.5rem 1rem",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {categories.map((category) => (
          <div
          className="bg-gray-200 rounded-full"
            key={category}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <span>{category}</span>
            <button
              onClick={() => deleteCategory(category)}
              style={{
                marginLeft: "0.5rem",
                border: "none",
                color: "red",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}