var getBunch = require('get-bunch'),
    validUrl = require('valid-url'),
    networks = require('./networks');
var parsers = {};

module.exports = function (url, callback) {
    if (typeof callback !== 'function') {
        console.error('ERROR: count-shares: callback function is required');
        return { 'error': true, 'message': 'missing callback' };
    }

    if (!validUrl.isWebUri(url)) {
        callback(url + ' is not valid URL');
        return;
    }

    var requests = getRequests(url);

    getBunch.getMulti(requests, function (results) {
        callback(null, parseResults(results));
    });
}

function getRequests(url) {
    url = encodeURIComponent(url);
    var requests = [];

    networks.map(function (network) {

        var networkUrl = network.url.replace('%url', url);
        if (network.name === 'facebook') { // http://stackoverflow.com/a/11967693/1900677
            networkUrl = networkUrl.replace(/%2C/g, '%252C');
        }

        requests.push({
            name: network.name,
            url:  networkUrl,
            type: 'plain'
        });

        parsers[network.name] = network.parse;
    });

    return requests;
}

function parseResults(results) {
    var parsedResults = {};

    for (var key in results) {
        try {
            parsedResults[ key ] = parsers[ key ](results[key]);
        } catch (e) {
            console.error(e);
            parsedResults[ key ] = 0;
        }
    }

    return parsedResults;
}