const express = require('express');
const path = require('path');

const router = express.Router();

router.use('/api', require('./api'));

router.get('/', (request, response) => {
    response.sendFile(path.resolve('./views/index.html'));
})

module.exports = router;