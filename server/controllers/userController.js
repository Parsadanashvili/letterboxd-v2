const User = require('../models/User');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');



module.exports = {
    get: (req, res) => {
        jwt.verify(req.token, process.env.TOKEN_SECRET, (err) => {
            if (err) {
                res.sendStatus(403).json({ message: 'Forbidden' });
            }
            User.find().then((users) => {
                return res.json({ users });
            });
        });
    },

    put: async (req, res) => {
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
    },
    post: async (req, res) => {
        const token = jwt.verify(req.token, process.env.TOKEN_SECRET);
        const user = await User.findOne({ email: token });
        const url = process.env.URL || 'http://localhost:3003';

        if (user.avatar !== '/assets/images/avatar.png') {
            fs.readFile(
                path.join('./uploads' + user.avatar.split('/')[3]),
                (err, data) => {
                    if (err) {
                        user.updateOne({ avatar: '/assets/images/avatar.png' });
                    }
                }
            );
        }

        if (user.avatar !== '/assets/images/avatar.png') {
            fs.unlink(
                path.join('./uploads/' + user.avatar.split('/')[3]),
                function (err) {
                    if (err) throw err;
                }
            );
        }

        if (user !== null) {
            await user.updateOne({
                avatar: `${url}/${req.file.filename}`,
            });

            return res.status(200).json({
                message: 'Uploaded',
                avatar: url + '/' + req.file.filename,
            });
        } else {
            return res.status(404).json({ message: 'Forbidden' });
        }
    },
    findById: (req, res) => {
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
    },
    getByToken: async (req, res) => {
        const token = jwt.verify(req.token, process.env.TOKEN_SECRET);
        const user = await User.findOne({ email: token });
    
        if (user !== null) {
            return res.status(200).json({ user: user });
        } else {
            return res.status(404).json({ message: 'Forbidden' });
        }
    }
}