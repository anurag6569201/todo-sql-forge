import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
    const [task, setTask] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/tasks', task)
            .then(response => {
                console.log('Task added successfully!', response.data);
                // Reset form or add some UI feedback
            })
            .catch(error => console.error('There was an error adding the task!', error));
    };

    return (
        <div>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={task.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
