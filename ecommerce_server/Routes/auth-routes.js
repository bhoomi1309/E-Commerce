const express = require('express');
const users = require('../models/Users');
const cart=require('../models/Cart');

const router = express.Router();

router.get('/users', async (req, res) => {
    const ans = await users.find();
    res.send(ans);
});
router.get('/users/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await users.findOne({ Email: email });
        if (user === null) {
            return res.json({ exists: false });
        }
        return res.json({ exists: true });
    }
    catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/users/username/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await users.findOne({ Username: username });
        if (user === null) {
            return res.json({ exists: false });
        }
        return res.json({ exists: true });
    }
    catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = new users(req.body);
        await newUser.save();

        const newCart = new cart({
            Email: req.body.Email,
            Cart: []
        });
        await newCart.save();


        res.status(201).json({ message: 'User registered successfully and cart created' });
    }
    catch (error) {
        console.error('Error during registration:', error);

        if (req.body.Email) {
            await users.deleteOne({ Email: req.body.Email });
        }

        res.status(500).json({ message: 'An error occurred while registering. Please try again later.' });
    }
});


router.post('/login', async (req, res) => {
    const checkUser = await users.findOne({ Email: req.body.Email });
    if (!checkUser) {
        return res.json({
            success: false,
            message: "User doesn't exists! Please register first",
        });
    }
    if (checkUser.Password !== req.body.Password) {
        return res.json({
            success: false,
            message: "Incorrect password! Please try again",
        });
    }
    res.json({
        success: true,
        message: "Logged in successfully",
        role: checkUser.Role === 'admin' ? 'admin' : 'user',
        user: {
            Email: checkUser.Email,
            Role: checkUser.Role,
            Username: checkUser.Username,
            Password: checkUser.Password,
            Phone: checkUser.Phone,
            Cart: checkUser.Cart
        }
    });
})

module.exports = router;