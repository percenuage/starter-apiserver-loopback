'use strict';

const Fs = require('fs');
const Dotenv = require('dotenv');

module.exports.environment = environment;
module.exports.storage = storage;

function environment() {
    Dotenv.config();
}

function storage(paths) {
    try {
        Fs.mkdirSync(process.env.STORAGE);
    } catch (err) {}
    paths.forEach(path => {
        try {
            Fs.mkdirSync(process.env.STORAGE + path);
        } catch (err) {}
    });
}