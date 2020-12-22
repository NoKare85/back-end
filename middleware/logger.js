const moment = require('moment');

const logger = (req, res, next) => {
    console.log(`Endpoint: ${req.url} Method: ${req.method}`);
    //console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;