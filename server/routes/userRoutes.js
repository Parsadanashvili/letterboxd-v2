const express = require('express');
const router = express.Router();
const multer = require('multer');
const ensureToken = require('../libs/ensureToken');
const controller = require('../controllers/userController')
const path = require('path')


function makeid(length) {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

let storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, makeid(20) + path.extname(file.originalname));
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



router.get('/users', ensureToken, controller.get);

router.put('/users', ensureToken, controller.put);

router.post('/users', upload.single('avatar'), ensureToken, controller.post);

router.get('/users/:id', controller.findById);

router.get('/user', ensureToken, controller.getByToken);

module.exports = router;
