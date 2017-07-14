'use strict';

module.exports = {
    db: {
        connector: 'mongodb',
        url: process.env.MONGO_URI
    },
    storage: {
        connector: 'loopback-component-storage',
        root: process.env.STORAGE
    }
};