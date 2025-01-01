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
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>Edit Task</h2>
            <form onSubmit={handleSubmit} className='bg-light p-4 rounded shadow-sm'>
                <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='completed' className='form-check-label'>
                        Completed
                    </label>
                    <input
                        type="checkbox"
                        id="completed"
                        name="completed"
                        className="form-check-input"
                        checked={task.completed}
                        onChange={(e) => setTask({ ...task, completed: e.target.checked })}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditTask;
