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
* uses forked [get-bunch](https://github.com/dominikbulaj/get-bunch) repository with added support for HTTPS protocol (see below "Dependencies")

Features
--------
Check provided url in each configured network for number of shares. It returns JSON object with shares count in each configured network:
```
{
  facebook: 171767,
  twitter: 550,
  google_plus: 2372,
  vk: 32,
  odnoklassniki: 60
}
```

## Example of usage
```javascript
var shares = require('shares-count');

shares.get('http://www.huffingtonpost.de', function (err, result) {
    if (err) {
        console.error(err);
        return;
    }

    // do what you want with result JSON
});
```

There's only one method to be called - **get(url, callback)**

Parameters:

1. {string} URL of resource to check
2. {function} callback function with two parameters error (string) and result (json) `callback(err, result)`

### Dependencies:

* [get-bunch](https://github.com/dominikbulaj/get-bunch) (forked from [clexit/get-bunch](https://github.com/clexit/get-bunch))
* [valid-url](https://github.com/ogt/valid-url)
