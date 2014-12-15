0.1.2 / 2014-12-15
==================

* fixed bug - Pinterest requires callback function name (JSONP)

0.1.1 / 2014-09-08
==================

* fixed bug - incorrect parsing Facebook shares count

0.1.0 / 2014-08-28
==================

* changed [clexit/get-bunch](https://github.com/clexit/get-bunch) to [request](https://www.npmjs.org/package/request) as now there is better control on requests done
* in case request fails, it will return count zero for current network and log error into console
* updated Mocha test
* networks.js now can contain optional **timeout** per network:
```javascript
    {
        name:  'pinterest',
        url:   'http://api.pinterest.com/v1/urls/count.json?callback=&url=%url',
        parse: function (res) {
            // json decode
            return JSON.parse(res).count || 0;
        },
        timeout: 3000 // 3000 ms = 3 seconds
    }
```
* by default: vk, odnoclasniki and wykop networks are disabled (optional flag that can be added to each network)
```javascript
    {
        name:  'wykop',
        url:   'http://www.wykop.pl/dataprovider/diggerwidget/?url=%url',
        parse: function (res) {
            var regex = /class=.+wykop-vote-counter[^>]+><a[^>]+>(\d+)/i;
            if (res.match(regex)) {
                return parseInt(res.match(regex)[1], 10);
            }
            return 0;
        },
        disabled: true // <<-- DISABLED
    }
```

0.0.6 / 2014-08-25
==================

* added Travis CI
* changed dependency from [clexit/get-bunch](https://github.com/clexit/get-bunch) to forked [get-bunch](https://github.com/dominikbulaj/get-bunch) where I added support for HTTPS protocol

0.0.5 / 2014-08-24
==================

* added one more test for missing callback
* if callback is missing it will throw Error
* updated package.json (main file information)

0.0.4 / 2014-08-23
==================

* for tests now uses Node's Assert instead should.js (one less devDependency)

0.0.3 / 2014-08-22
==================

* added Mocha test (uses should.js)

0.0.2 / 2014-08-22
==================

* added following networks, thanks to [https://gist.github.com/jonathanmoore/2640302](https://gist.github.com/jonathanmoore/2640302)
    - Pinterest
    - LinkedIn
    - StumbleUpon
