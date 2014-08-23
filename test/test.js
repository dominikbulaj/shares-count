var assert = require("assert")
var shares = require('../index');

describe('shares-count', function () {
    describe('missing callback', function(){
        it('should finish with error', function(){
            assert.throws(
                function() { shares.get('http://www.huffingtonpost.com') },
                Error
            );
        });
    });

    describe('fetching correct & existing URL - http://www.huffingtonpost.com', function(){
        it('should finish without error and with result object', function(done){
            shares.get('http://www.huffingtonpost.com', function (err, result) {
                assert.ifError(err);
                assert(typeof result == 'object');
                done();
            });
        });
    });

    describe('#fetching correct but notexisting URL - http://notexistingurl.com', function(){
        it('should save without error and with result object (with zeros)', function(done){
            shares.get('http://notexistingurl.com', function (err, result) {
                assert.ifError(err);
                assert(typeof result == 'object');
                done();
            });
        });
    });

    describe('#fetching incorrect URL - ftp://example.com', function () {
        it('should catch incorrect URL error', function (done) {
            shares.get('ftp://example.com', function (err, result) {
                assert(err);
                assert(typeof result == 'undefined');
                done();
            });
        });
    });

    describe('#fetching incorrect URL - http:www.example.com', function(){
        it('should catch incorrect URL error', function(done){
            shares.get('http:www.example.com', function (err, result) {
                assert(err);
                assert(typeof result == 'undefined');
                done();
            });
        });
    });
});