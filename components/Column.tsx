// components/Column.tsx
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import AddTaskForm from "./AddTaskForm";

export type Task = {
  id: string;
  content: string;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (content: string) => void;
};

const Column: React.FC<ColumnProps> = ({ column, tasks, onAddTask }) => {
  return (
    <div>
      <div
        style={{
          minHeight: "60vh",
          width: "100%",
          background: "#f8f8f8",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        <h2
          style={{
            margin: "0 0 8px 0",
            textAlign: "center",
            padding: "8px",
            background: "rgb(228, 210, 129)",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            fontSize: "1.4rem",
          }}
        >
          {column.title}
        </h2>
        <Droppable
          droppableId={column.id}
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={false}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: "60vh" }}
            >
              {tasks.map((task, index) => (
                <Card key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <AddTaskForm onAddTask={onAddTask} />
    </div>
  );
};

export default Column;
