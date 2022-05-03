const express = require('express');
const router = express.Router();
const User = require('../models/User');

const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

router.get('/', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
            res.sendStatus(403).json({ message: 'Forbidden' });
        }
        User.find().then((users) => {
            return res.json({ users });
        });
    });
});

router.put('/', ensureToken, async (req, res) => {
    const email = jwt.verify(req.token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ email: email });

    const { username } = req.body;
    const { avatar } = req.body;

    if (user !== null) {
        if (username.length > 3) {
            await User.findOneAndUpdate({ email }, { username });
            return res.json({ message: 'Username has been updated' });
        } else {
            return res
                .status(403)
                .json({ message: 'Username must be more than 3 characters' });
        }
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then((user) => {
            return res.json({
                username: user.username,
                avatar: user.avatar,
                _id: user._id,
            });
        })
        .catch((err) => {
            return res.status(404).json({ message: 'User not found' });
        });
});

module.exports = router;
