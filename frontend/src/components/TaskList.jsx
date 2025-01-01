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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Task List</h2>
            {tasks.length > 0 ? (
                <div className="row">
                    {tasks.map((task) => (
                        <div className="col-md-4 mb-4" key={task.id}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.description}</p>
                                    <p className="text-muted">Completed: {task.completed ? 'Yes' : 'No'}</p>
                                    <div className="mb-3">
                                        {/* Delete Task button above Edit Task */}
                                        <DeleteTask taskId={task.id} onDelete={handleDelete} />
                                    </div>
                                    <div>
                                        {/* Edit Task Section */}
                                        <EditTask taskId={task.id} onEdit={handleEdit} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No tasks available</p>
            )}
        </div>
    );
};

export default TaskList;
