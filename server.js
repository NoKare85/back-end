require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();
//const logger = require('./middleware/logger');
//const path = require('path');
const Task = require('./models/tasks');
const User = require('./models/users');

// Init middleware 
//app.use(logger);

// Set static folder
//app.use(express.static(path.join(__dirname, 'public')));

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

// Home page router
app.get('/', async (req, res) => {
    const tasks = await Task.find().lean();
    const users = await User.find().lean();
    for (task in tasks) {
        if (tasks[task].assignee != null) {
            for (user in users) {
            if (tasks[task].assignee == users[user]._id) {
                tasks[task].assignee = users[user].firstname + " " + users[user].lastname;
            };
        }
        }
        
    }
    res.render('index', {
    title: 'Todo App',
    tasks,
    users
    }) 
});

// API page route
app.use('/apipage', (req, res) => {
    res.render('api', {
    title: 'Api page',
    })
})



// Tasks API routes
app.use('/api/tasks', require('./routes/api/tasks'));
app.use('/api/users', require('./routes/api/users'));



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', (open) => console.log('Connected to Database'));

app.use(express.json());

const taskRouter = require('./routes/api/tasks');
const userRouter = require('./routes/api/users');
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

