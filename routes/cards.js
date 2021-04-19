const { signedCookie } = require('cookie-parser');
const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/', (req, res) => {
    const randomID = (Math.floor(Math.random() * cards.length));
    res.redirect(`/cards/${randomID}?side=question`);
    //res.send(`Random ID: ${randomID}`);
});

router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;
    const text = cards[id][side];
    const {hint} = cards[id];
    const templateData = { id, text};
    if (side === 'question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Show the answer';
    } else {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Show the question';
    }
    res.render('card', templateData);
});

module.exports = router;