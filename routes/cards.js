const { signedCookie } = require('cookie-parser');
const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/', (req, res) => {
    const randomID = (Math.floor(Math.random() * cards.length));
    res.redirect(`/cards/${randomID}?side=question`);
});

router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;
    const name = req.cookies.username;
    if (!side){ return res.redirect(`/cards/${id}?side=question`)};
    const text = cards[id][side];
    const {hint} = cards[id];
    const templateData = { id, text, name, side};
    if (side === 'question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
    } else {
        templateData.sideToShow = 'question';
    }
    res.render('card', templateData);
});

module.exports = router;