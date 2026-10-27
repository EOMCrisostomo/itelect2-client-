function TaskList ({ tasks }) {
    return(
        <ul>
            {tasks.map ((task) => (
                <li key ={task.id}>
                    {task.title} - {task.dueDate ? task.dueDate.slice(0, 10) : "No Due Date"}
                </li>
            ))}
        </ul>
    );
} 
export default TaskList;