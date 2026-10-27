import { useState, useEffect } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

const STARTING_TASKS = [
  { id: 1, title: "Do dishes", dueDate: "2026-11-11" },
  { id: 2, title: "Study", dueDate: "2026-11-05" },
  { id: 3, title: "Create Video Edit", dueDate: "2026-11-08" },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
      setTasks(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) loadTasks();
    }, [token]);

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoginError(null);
      try {
        const response = await fetch(`${API}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to login");
        setToken(data.token);
      } catch (err) {
        setLoginError(err.message);
      }
    };

  return (
    <main>
      <h1>Task Manager</h1>
      {!token ? (
        <form onSubmit={handleLogin}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </form>
      ) : (
        <>
          <TaskForm token={token} onAdd={loadTasks} />
          {loading && <p>Loading tasks...</p>}
          {error && <p style={{ color: "red" }}>Could not load tasks: {error}</p>}
          {!loading && !error && tasks.length === 0 && <p>No tasks available.</p>}
          {!loading && !error && tasks.length > 0 && (
            <>
              <p>{tasks.length} tasks listed</p>
              <TaskList tasks={tasks}/>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default App;