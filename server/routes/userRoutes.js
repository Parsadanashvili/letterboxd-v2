const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

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

let storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    dest: './uploads',
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
});

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
        .catch(() => {
            return res.status(404).json({ message: 'User not found' });
        });
});

router.post('/:id', upload.single('avatar'), ensureToken, async (req, res) => {
    const { id } = req.params;
    const token = jwt.verify(req.token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ email: token });
    const url = process.env.URL || 'http://localhost:3003';

    if (user.avatar !== '/assets/images/avatar.png') {
        fs.unlink(
            path.join('./uploads/' + user.avatar.split('/')[3]),
            function async (err) {
                await user.updateOne({ avatar: '/assets/images/avatar.png'});
                if (err) throw err;

            }
        );
    }

    if (user !== null) {
        await user.updateOne({
            avatar: `${url}/${req.file.filename}`,
        });
        return res.status(200).json({ message: 'Uploaded' });
    } else {
        return res.status(404).json({ message: 'Forbidden' });
    }
});

module.exports = router;
