// components/Card.tsx
import React from "react";
import { Draggable } from "react-beautiful-dnd";

export type Task = {
  id: string;
  content: string;
};

type CardProps = {
  task: Task;
  index: number;
  onDelete: (taskId: string) => void;
};

const Card: React.FC<CardProps> = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            padding: "8px",
            margin: "0 0 8px 0",
            background: "#fff",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            ...provided.draggableProps.style,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{task.content}</span>
            <button
              onClick={() => onDelete(task.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                color: "red",
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
