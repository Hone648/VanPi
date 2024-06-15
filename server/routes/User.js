const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/user", async (req, res) => {
    try {
        console.log('saw');
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

router.get('/user', async (req, res) => {
    try {
        User.find()
            .then((users) => {
                console.log(users);
                res.status(200).json({ users: users });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ msg: "Retrieve users was unsuccessful." })
            })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Unable to retrieve Users." })
    }
})

router.delete('/user/:userId', async (req, res) => {
    try {
        User.findByIdAndDelete(req.params.userId)

    }
    catch (err) {
        res.status(500).json({ msg: "Unable to delete user." })
    }
})
module.exports = router;