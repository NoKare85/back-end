const express = require('express');
//const { restart } = require('nodemon');
const router = express.Router();
const User = require('../../models/users');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});
// Create user
router.post('/', async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    try {
        const newUser = await user.save();
        //res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
    res.redirect('/');
});
// Update User
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.firstname != null) {
        res.task.firstname = req.body.firstname;
    }
    if (req.body.lastname != null) {
        res.task.firstname = req.body.firstname;
    }
    try {
        const updateUser = await res.user.save();
        res.json(updateUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
// Delete user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json("User removed");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: 'Cannot find user'});
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }

    res.user = user;
    next()
}

module.exports = router;