const jwt = require('jsonwebtoken');
const Followings = require('../models/Followings');
const User = require('../models/User');

module.exports = {
    follow: async (req, res) => {
        const { to } = req.body;
        const email = jwt.verify(req.token, process.env.TOKEN_SECRET);

        const user = await User.findOne({ email });
        const user2 = await User.findOne({ _id: to });

        if(user !== null && user2 !== null) {
            
            if(user === user2) {
                return res.status(403).json({ message: `You can't follow yourself` });
            }

            const follow = await Followings.findOne({
                from: user._id,
                to: user2._id
            });

            if(follow !== null) {
                return res.status(403).json({ message: `You are already following ${user2.username}` });
            }

            const newFollow = new Followings({
                from: user._id,
                to: user2._id
            });
            await newFollow.save()
            .then(() => {
                res.status(200).json({ message: `You are now following ${user2.username}` });
            })
            .catch(err => {
                res.status(500).json({ message: `Something went wrong` });
            })
        }
    },
    unfollow: async (req, res) => {
        const { to } = req.body;
        const email = jwt.verify(req.token, process.env.TOKEN_SECRET);
        
        const user = await User.findOne({ email });
        const user2 = await User.findOne({ _id: to });

        if(user !== null && user2 !== null) {
            const follow = await Followings.findOne({
                from: user._id,
                to: user2._id
            });

            if(follow === null) {
                return res.status(403).json({ message: `You are not following ${user2.username}` });
            }

            await Followings.deleteOne({
                from: user._id,
                to: user2._id
            })

            res.status(200).json({ message: `You are no longer following ${user2.username}` });

        }
        else {
            return res.status(404).json({ message: `User not found` });
        }
    }
}