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
  onDelete: (taskId: string) => void;
};

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  onAddTask,
  onDelete,
}) => {
  return (
    <div>
      <div
        style={{
          minHeight: "60vh",
          width: "100%",
        }}
        id={column.id}
      >
        <h2
          style={{
            margin: "0 0 8px 0",
            textAlign: "center",
            padding: "8px",
            fontSize: "1.4rem",
            borderBottom: "2px solid #000",
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
                <Card
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={() => onDelete(task.id)}
                />
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
