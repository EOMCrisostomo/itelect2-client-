function TaskList ({ tasks }) {
    return(
        <ul>
            {tasks.map ((task) => (
                <li key ={task.id}>
                    {task.title} - {task.dueDate ? task.dueDate : "No Due Date"}
                </li>
            ))}
        </ul>
    );
} 
export default TaskList;