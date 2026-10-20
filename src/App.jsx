import { useState } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import "./App.css";

const STARTING_TASKS = [
  { id: 1, title: "Do dishes", dueDate: "2026-11-11" },
  { id: 2, title: "Study", dueDate: "2026-11-05" },
  { id: 3, title: "Create Video Edit", dueDate: "2026-11-08" },
];

function App() {
  const addTask = (title) => {
    const newTask = { 
      id: Date.now(), 
      title: title, 
      dueDate: null 
    };
    setTasks([...tasks, newTask]);
  };

  const [tasks, setTasks] = useState(STARTING_TASKS);

  return (
    <main>
      <h1>Task Manager</h1>
      <p>{tasks.length} tasks listed</p>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </main>
  );
}

export default App;