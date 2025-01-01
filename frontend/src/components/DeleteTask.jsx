import React from 'react';
import axios from 'axios';

const DeleteTask = ({ taskId, onDelete }) => {

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/tasks/${taskId}`)
            .then(response => {
                console.log('Task deleted:', response.data);
                onDelete(taskId); // Notify parent component to remove the task from the list
            })
            .catch(error => console.error('There was an error deleting the task!', error));
    };

    return (
        <div>
            <button className ="btn btn-danger" onClick={handleDelete}>Delete Task</button>
        </div>
    );
};

export default DeleteTask;
