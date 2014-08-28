Shares Count
============
Originally developed by [https://github.com/clexit/social-widgets](clexit)

[![Build Status](https://travis-ci.org/dominikbulaj/shares-count.svg?branch=master)](https://travis-ci.org/dominikbulaj/shares-count)

Changes to original code
------------------------
* networks.js is an array not object
* there's no networks filtering (module checks all sources configured in networks.js)
* added [valid-url](https://github.com/ogt/valid-url) dependency for validating URLs
* added Facebook, Pinterest, LinkedIn, StumbleUpon, Odnoklassniki (Russia), VKontakte (Russia) and Wykop.pl (Poland) shares counts

Features
--------
Check provided url in each configured network for number of shares. It returns JSON object with shares count in each configured network:
```
{
  facebook: 171767,
  twitter: 550,
  google_plus: 2372
}
```

## Example of usage
```javascript
var shares = require('shares-count');

shares.get('http://www.example.com', function (err, result) {
    if (err) {
        console.error(err);
        return;
    }

    // do what you want with result JSON
    console.log(result);
});
```

There's only one method to be called - **get(url, callback)**

Parameters:

1. {string} URL of resource to check
2. {function} callback function with two parameters error (string) and result (json) `callback(err, result)`

### Dependencies:

* [request](https://www.npmjs.org/package/request)
* [valid-url](https://github.com/ogt/valid-url)
