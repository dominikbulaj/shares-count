var shares = require('../index');

shares.get('http://www.huffingtonpost.com', function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result)
});
