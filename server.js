const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

const port = 3000;

// Middleware
app.use(bodyParser.json());

let tasks = [
    { id: 1, name: "Learn Node.js", completed: false },
    { id: 2, name: "Build a REST API", completed: true },
    { id: 3, name: "Build a REST API", completed: true },
    { id: 4, name: "Build a REST API", completed: true },
    { id: 5, name: "Build a REST API", completed: true },
    { id: 6, name: "Build a REST API", completed: true },
    { id: 7, name: "Build a REST API", completed: true },
    { id: 8, name: "Build a REST API", completed: true },
    { id: 9, name: "Build a REST API", completed: true },
    { id: 10, name: "Build a REST API", completed: true },
    { id: 11, name: "Build a REST API", completed: true },
    { id: 12, name: "Build a REST API", completed: true },
    { id: 13, name: "Build a REST API", completed: true },
    { id: 14, name: "Build a REST API", completed: true },
];

// Routes

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        name: req.body.name,
        completed: req.body.completed || false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');

    task.name = req.body.name || task.name;
    task.completed = req.body.completed ?? task.completed;

    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
