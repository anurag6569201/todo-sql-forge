import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTask = ({ taskId, onEdit }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        completed: false,
    });

    useEffect(() => {
        // Fetch task details by ID to populate the form
        axios.get(`http://localhost:5000/tasks/${taskId}`)
            .then(response => {
                setTask(response.data);
            })
            .catch(error => console.error('There was an error fetching the task details!', error));
    }, [taskId]);

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/tasks/${taskId}`, task)
            .then(response => {
                console.log('Task updated:', response.data);
                onEdit(task); // Notify parent component about the update
            })
            .catch(error => console.error('There was an error updating the task!', error));
    };

    return (
        <div>
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    required
                />
                <label>
                    Completed:
                    <input
                        type="checkbox"
                        name="completed"
                        checked={task.completed}
                        onChange={(e) => setTask({ ...task, completed: e.target.checked })}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditTask;
