var should = require("should")
var shares = require('../index');

describe('shares-count', function () {
    describe('fetching correct & existing URL - http://www.huffingtonpost.com', function(){
        it('should finish without error', function(done){
            shares.get('http://www.huffingtonpost.com', function (err, result) {
                should(err).not.be.ok;
                should(result).be.ok;
                done();
            });
        });
    });

    describe('#fetching correct but notexisting URL - http://notexistingurl.com', function(){
        it('should save without error', function(done){
            shares.get('http://notexistingurl.com', function (err, result) {
                should(err).not.be.ok;
                should(result).be.ok;
                done();
            });
        });
    });

    describe('#fetching incorrect URL - ftp://example.com', function () {
        it('should catch incorrect URL error', function (done) {
            shares.get('ftp://example.com', function (err, result) {
                should(err).be.ok;
                should(result).not.be.ok;
                done();
            });
        });
    });

    describe('#fetching incorrect URL - http:www.example.com', function(){
        it('should catch incorrect URL error', function(done){
            shares.get('http:www.example.com', function (err, result) {
                should(err).be.ok;
                should(result).not.be.ok;
                done();
            });
        });
    });
});