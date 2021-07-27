const express = require('express');

const artikel = require('./artikel');

const router = express.Router();

router.use('/artikel', artikel);

module.exports = router;
