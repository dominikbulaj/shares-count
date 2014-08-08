var shares = require('../index');

shares.get('http://www.huffingtonpost.de', function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result)
});
