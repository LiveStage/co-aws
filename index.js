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

function Client(opts, services) {
    if (!(this instanceof Client)) return new Client(opts, services);

    if(!(services instanceof Array) || services.length === 0) {
        throw new Error('You must specify a string array of AWS services to initialise and thunk. e.g. [\'S3\', \'EC2\']. See the class names here http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html');
    }

    // global?
    aws.config.update(opts);

    // Expose the wrap me function so if folks need to create things like s3 clients for other buckets, they can easily thunk them.
    this.wrap = wrap;

    services.forEach(function (service) {
        this[service] = new aws[service];
        wrap(this[service]);
    }, this);
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
