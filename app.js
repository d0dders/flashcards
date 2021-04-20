const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded());
app.use(cookieParser());
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const mainRoutes = require('./routes');
app.use(mainRoutes);
const cardRoutes = require('./routes/cards');
const { static } = require('express');
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => console.log('Application running on port 3000'));