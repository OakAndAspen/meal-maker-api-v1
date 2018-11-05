// --- IMPORTS ---
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
app.use('/users', authenticate, usersRouter);
app.use('/groups', authenticate, groupsRouter);
app.use('/recipes', authenticate, recipesRouter);
app.use('/meals', authenticate, mealsRouter);

// Catch 404
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res) {
    return res.status(err.status || 500).send(err.message);
});

// Authentication middleware
function authenticate (req, res, next) {
    // Check the header
    const authorization = req.get('Authorization');
    if (!authorization) return res.status(401).send('NoAuthHeader');
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) return res.status(401).send('WrongAuthHeader');

    // Verify token
    const token = match[1];
    const secretKey = process.env.SECRET_KEY || 'changeme';
    jwt.verify(token, secretKey, function (err, payload) {
        if (err) return res.status(401).send('TokenInvalid');
        req.userId = payload.sub;
        next();
    });
}

module.exports = app;