const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const Task = require('../../models/tasks');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get one task
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});
// Create task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const newTask = await task.save();
        //res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
    res.redirect('/');
});
// Update subscriber
router.patch('/:id', getTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    try {
        const updateTask = await res.task.save();
        res.json(updateTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
// Delete subscriber
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.remove();
        res.json("Task removed");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({message: 'Cannot find task'});
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }

    res.task = task;
    next()
}

async function deleteTask(id) {
    await Task.deleteOne(id);
}

module.exports = router;