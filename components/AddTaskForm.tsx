// components/AddTaskForm.tsx
"use client";
import React, { useState } from "react";

type AddTaskFormProps = {
  onAddTask: (content: string) => void;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;
    onAddTask(trimmedContent);
    setContent("");
  };

  return (
    // formularz przykleja się do dołu kolumny prosze o pomoc
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "8px",
        background: "#fff",
        borderRadius: "0 0 4px 4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nowe zadanie"
        style={{ padding: "4px", width: "70%" }}
      />
      <button type="submit" style={{ padding: "4px 8px", marginLeft: "4px" }}>
        Dodaj
      </button>
    </form>
  );
};

export default AddTaskForm;
