require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();
const Task = require('./models/tasks');


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
    res.render('index', {
    title: 'Todo App',
    tasks
    }) 
});



// Tasks API routes
app.use('/api/tasks', require('./routes/api/tasks'));



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', (open) => console.log('Connected to Database'));

app.use(express.json());

const taskRouter = require('./routes/api/tasks');
app.use('/tasks', taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

