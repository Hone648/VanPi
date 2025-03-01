const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/user", async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        if (userCount >= 3) {
            return res.status(400).json({
                msg: "Cannot create more than 3 users"
            });
        }

        const newUser = new User(req.body);
        await newUser.save()
            .then((savedUser) => {
                res.status(201).json({
                    msg: savedUser
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ msg: err.message })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message })
    }
})

router.get('/user', async (req, res) => {
    try {
        User.find()
            .then((users) => {
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
        const id = req.params.userId;
        const userDelete = await User.findByIdAndDelete(id);
        res.send("User deleted successfully.")
    }
    catch (err) {
        res.status(500).json({ msg: err.message })
    }
})
router.get('/user/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const user = await User.findById(id);
        res.send(user)
    }
    catch (err) {
        res.status(500).json({ msg: err.message })
    }
})
module.exports = router;