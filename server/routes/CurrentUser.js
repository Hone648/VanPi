const express = require('express');
const router = express.Router();
const CurrentUser = require('../models/currentUser');
const User = require('../models/user');

router.post('/currentUser', async (req, res) => {
    try {
        const userCount = new CurrentUser(req.body);
        await userCount.save()
            .then((savedCurrentUser) => {
                res.status(201).json({
                    msg: savedCurrentUser
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ msg: err.message })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message })
    }
})

router.get('/currentUser/', async (req, res) => {
    try {
        CurrentUser.find()
            .then((user) => {
                res.status(200).json({ user: user })
            })
    } catch (err) {
        return res.status(500).json({ user: undefined })
    }
})
module.exports = router;