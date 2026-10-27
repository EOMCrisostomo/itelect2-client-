import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

function getUserId(token) {
    try {
        const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(payload)).id;
    } catch {
        return null;
    }
}

function TaskForm ({ token, onAdd }) {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = title.trim(); 
        if (trimmed === "" || dueDate === "") return;
        setError(null);
        try {
            const response = await fetch(`${API}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: trimmed, dueDate, userId: getUserId(token) }),
            });
            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                throw new Error(body.error || `Server responded with ${response.status}`);
            }
            setTitle("");
            setDueDate("");
            onAdd();
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task title" />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" />
        <button type="submit"> Add Task </button> 
        {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
    
}

export default TaskForm;