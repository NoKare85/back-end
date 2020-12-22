const express = require('express');
//const { restart } = require('nodemon');
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
    if (req.body.id != null) {
        console.log("it's not null")
        const task = await Task.findById(req.body.id);
        if (req.body.title != null) {
            task.title = req.body.title;
        }
        if (req.body.description != null) {
            task.description = req.body.description;
        }
        if (req.body.assignee != null) {
            task.assignee = req.body.assignee;
        }
        try {
            const updateTask = await task.save();
            //res.json(updateTask);
            res.redirect('/');
        } catch (err) {
            res.status(400).json({message: err.message});
    };
    } else {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        assignee: req.body.assignee
    });

    try {
        const newTask = await task.save();
        //res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
    res.redirect('/');
    }});

// Update task
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
};
});

// Delete task
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.remove();
        res.json("Task removed");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

async function getTask(req, res, next) {
    console.log(req.params);
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

module.exports = router;