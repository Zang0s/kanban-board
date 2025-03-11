// components/KanbanBoard.tsx
"use client";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";

export type Task = {
  id: string;
  content: string;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type KanbanState = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
};

const initialData: KanbanState = {
  tasks: {
    "task-1": { id: "task-1", content: "Zadanie 1" },
    "task-2": { id: "task-2", content: "Zadanie 2" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Do zrobienia",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "W trakcie",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Zrobione",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default function KanbanBoard() {
  const [data, setData] = useState<KanbanState>(initialData);

  const addTask = (columnId: string, content: string) => {
    // Generujemy nowe ID, np. na podstawie długości obiektu tasks
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content };

    // Aktualizacja zadań
    const newTasks = { ...data.tasks, [newTaskId]: newTask };

    // Aktualizacja kolumny, do której dodajemy zadanie
    const column = data.columns[columnId];
    const newTaskIds = [...column.taskIds, newTaskId];
    const updatedColumn = { ...column, taskIds: newTaskIds };

    const newData = {
      ...data,
      tasks: newTasks,
      columns: { ...data.columns, [columnId]: updatedColumn },
    };

    setData(newData);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Jeśli upuszczono poza obszar – nic nie robimy
    if (!destination) return;

    // Jeśli nie zmieniono pozycji – również nie robimy nic
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    // Przeciąganie w obrębie tej samej kolumny
    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [updatedColumn.id]: updatedColumn,
        },
      };

      setData(newState);
      return;
    }

    // Przeciąganie między różnymi kolumnami
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const updatedStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(endColumn.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const updatedEnd = {
      ...endColumn,
      taskIds: endTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [updatedStart.id]: updatedStart,
        [updatedEnd.id]: updatedEnd,
      },
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          padding: "16px",
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onAddTask={(content: string) => addTask(column.id, content)}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
