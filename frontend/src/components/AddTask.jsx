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
                setTask({ title: '', description: '' }); // Reset form after successful submission
                // Optionally, you can display a success message or redirect
            })
            .catch(error => console.error('There was an error adding the task!', error));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Task Title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        name="description"
                        className="form-control"
                        placeholder="Task Description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
