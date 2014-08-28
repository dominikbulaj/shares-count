var validUrl = require('valid-url'),
    networks = require('./networks'),
    request = require('request');

var DEFAULT_TIMEOUT = 2000; // ms

module.exports = function (url, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Missing callback (count-shares: callback function is required)');
    }

    if (!validUrl.isWebUri(url)) {
        callback(url + ' is not valid URL');
        return;
    }

    var requests = getRequests(url);

    var counts = {};
    var fetched = 0;
    requests.forEach(function (network, index, array) {
        request({url: network.url, timeout: network.timeout || DEFAULT_TIMEOUT}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                counts[network.name] = network.parse(body);
            } else {
                counts[network.name] = 0;
                console.error(error);
            }

            // if last - parse results
            if (++fetched === array.length) {
                callback(null, counts);
            }
        });
    });
}

function getRequests(url) {
    url = encodeURIComponent(url);
    var requests = [];

    networks.map(function (network) {

        if (!(network.disabled || false)) {

            var networkUrl = network.url.replace('%url', url);
            if (network.name === 'facebook') { // http://stackoverflow.com/a/11967693/1900677
                networkUrl = networkUrl.replace(/%2C/g, '%252C');
            }

            requests.push({
                name:    network.name,
                url:     networkUrl,
                parse:   network.parse,
                timeout: network.timeout
            });
        }
    });

    return requests;
}