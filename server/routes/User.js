const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/user", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save()
            .then((savedUser) => {
                console.log(savedUser);
                res.status(201).json({ msg: "User saved successfully." })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ msg: "Save was unsuccessful." })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Save was unsuccessful." })
    }
})
module.exports = router;