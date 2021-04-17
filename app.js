const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded());
app.use(cookieParser());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
    
});
app.get('/card', (req, res) => {
    res.render('card', { prompt: "Who is in Grant's tomb?", hint : "Think about who's tomb it is" });
});
app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});
app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});
app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

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