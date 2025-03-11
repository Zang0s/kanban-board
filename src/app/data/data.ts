type Task = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type KanbanState = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
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
