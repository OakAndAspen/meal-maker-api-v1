// --- IMPORTS ---
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const recipesRouter = require('./routes/recipes');
const mealsRouter = require('./routes/meals');

// --- MONGOOSE CONFIG ---
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mealmaker-v1', {
    useNewUrlParser: true
});

// --- APP CONFIG ---
const app = express();

// Configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/recipes', recipesRouter);
app.use('/meals', mealsRouter);

// Catch 404
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    //res.render('error');
    res.send({
        error: err.message
    });
});

module.exports = app;