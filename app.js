const express = require('express');

const app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/card', (req, res) => {
    res.render('card', { prompt: "Who is in Grant's tomb?", hint : "Think about who's tomb it is" });
});

app.listen(3000, () => console.log('Application running on port 3000'));