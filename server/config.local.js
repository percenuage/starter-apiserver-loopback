'use strict';

const Package = require('../package.json');
const Version = Package.version.split('.').shift();

module.exports = {
    restApiRoot: '/api' + (Version > 0 ? '/v' + Version : ''),
    host: process.env.HOST,
    port: process.env.PORT
};