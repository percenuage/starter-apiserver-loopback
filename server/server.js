'use strict';

/* ---------- MODULE DEPENDENCIES ---------- */

const Loopback = require('loopback');
const Boot = require('loopback-boot');
const Auth = require('http-auth');

/* ---------- APPLICATION ---------- */

var app = module.exports = Loopback();

/* ---------- INITIALISATION ---------- */

const Init = require('./initialisation');
Init.environment();
Init.storage([]);

/* ---------- CONFIGURATIONS ---------- */

if (process.env.NODE_ENV !== 'development') {
    app.use(Auth.connect(Auth.basic({realm: "Private area", file: ".htpasswd"})));
}

/* ---------- MAIN ---------- */

app.start = () => {
    return app.listen(() => {
        app.emit('started');

        const BASE_URL = app.get('url').replace(/\/$/, '');
        console.info(`[${process.env.NODE_ENV}] Server listening @ ${BASE_URL}`);

        if (app.get('loopback-component-explorer')) {
            const EXPLORER_PATH = app.get('loopback-component-explorer').mountPath;
            console.info(`[${process.env.NODE_ENV}] Browse your REST API @ ${BASE_URL}${EXPLORER_PATH}`);
        }
    });
};

Boot(app, __dirname, err => {
    if (err) throw err;

    if (require.main === module) {
        app.start();
    }
});
