# co-aws

  AWS client for generators.



## Installation

```
$ npm install co-aws2
```

## Example

```js

var AWS = require('co-aws');
var co = require('co');

var aws = AWS({
  accessKeyId: conf.key,
  secretAccessKey: conf.secret,
  sslEnabled: true,
  region: 'us-west-2'
}, ['EC2', 'S3']);

co(function *() {
    var instances = yield aws.EC2.describeInstances();
    console.log(JSON.stringify(instances, null, 4));
    
    var objects = yield aws.S3.listObjects({ Bucket: 'my bucket' });
    console.log(JSON.stringify(objects, null, 4));
    
})(function () {
    console.log('We are done');
});

```

# License

  MIT
