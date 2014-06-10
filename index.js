/**
 * Module dependencies.
 */

var thunkify = require('thunkify');
var aws = require('aws-sdk');

/**
 * Expose `Client`.
 */

module.exports = Client;

/**
 * AWS client.
 *
 * @param {Object} [opts]
 * @api public
 */

function Client(opts) {
    if (!(this instanceof Client)) return new Client(opts);

    // global?
    aws.config.update(opts);

    // wayyyy more to support...
    ['EC2', 'S3'].forEach(function (service) {
        this[service] = new aws[service];
        wrap(this[service]);
    });
}

/**
 * Wrap `obj` methods.
 */

function wrap(obj) {
    Object.keys(obj.__proto__).forEach(function (key) {
        var val = obj.__proto__[key];
        if ('constructor' == val) return;
        if ('function' != typeof val) return;
        obj[key] = thunkify(obj[key]);
    });
}
