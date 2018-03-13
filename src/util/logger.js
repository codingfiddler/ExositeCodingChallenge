/* Provide a re-usable logger module using Winston */
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const fs = require('fs');
var dir = './logs';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var now = new Date();
var date = (now.getMonth()+1) + '-' + now.getDate() + '-' + now.getFullYear();
const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), format.json()),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined' + date + '.log' })
    ]
});

module.exports = logger;