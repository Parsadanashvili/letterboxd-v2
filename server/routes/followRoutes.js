const express = require('express');
const router = express.Router();
const ensureToken = require('../libs/ensureToken');

const controller = require('../controllers/followController')

router.post('/follow', ensureToken, controller.follow);

router.post('/unfollow', ensureToken, controller.unfollow);

module.exports = router;