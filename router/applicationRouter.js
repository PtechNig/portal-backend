const express = require('express')
const router = express.Router()
const multer = require('multer')
const {application} = require('../controller/applicationController')


// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/application', upload.single('file'), application)

module.exports = router;