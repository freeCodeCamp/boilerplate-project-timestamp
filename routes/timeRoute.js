const express = require('express');
const route = express.Router();
const { timeStamp } = require('../controller/timeController.js');

route.get('/api/1652281179197', timeStamp)
    .get('/api/2022-05-11', timeStamp);

exports.route = route;