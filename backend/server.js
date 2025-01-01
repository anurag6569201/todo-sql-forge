const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); 
const Task = require('./models/Task'); // Use Task model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sync Database
sequelize.sync().then(() => {
    console.log('Database synchronized.');
}).catch((err) => {
    console.error('Error synchronizing database:', err);
});

// API Routes
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id); 
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task); 
    } catch (err) {
        res.status(500).json({ error: 'Error fetching task' });
    }
});



app.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({ title, description });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.completed = completed ?? task.completed;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.destroy();
        res.status(204).end(); // No content
    } catch (err) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
