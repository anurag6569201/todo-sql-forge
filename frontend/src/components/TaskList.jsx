import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(response => {
                console.log('Tasks fetched:', response.data);
                setTasks(response.data);
            })
            .catch(error => console.error('There was an error fetching the tasks!', error));
    }, []);

    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId)); // Remove the deleted task from the list
    };

    const handleEdit = (updatedTask) => {
        setTasks(tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        )); // Update the task in the list
    };

    return (
        <div>
            <h2>Task List</h2>
            {tasks && tasks.length > 0 ? (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <label>
                                Completed: {task.completed ? 'Yes' : 'No'}
                            </label>
                            <EditTask taskId={task.id} onEdit={handleEdit} />
                            <DeleteTask taskId={task.id} onDelete={handleDelete} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available</p> // Display this if no tasks are available
            )}
        </div>
    );

};

export default TaskList;
