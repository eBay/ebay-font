'use strict';

require('marko/node-require').install();
var expect = require('chai').expect;
var renderer = require('../../font/marketsans/');

describe('ebay-font ', function() {
    it('should render template with <style> & <script>', function(done) {
        var out = function(err, output) {
            if (err) {
                done(err);
            }
            var htmlStr = output.toString();
            expect(htmlStr).to.contain('<style>')
                .and.to.contain('<script>');

            done();
        };
        out.global = {};
        renderer({}, out);
    });

    it('should render attribute nonce', function(done) {
        var out = function(err, output) {
            if (err) {
                done(err);
            }
            var htmlStr = output.toString();
            expect(htmlStr).to.contain('<style nonce=test-123>')
                .and.to.contain('<script nonce=test-123>');

            done();
        };
        out.global = {};
        renderer({ nonce: 'test-123' }, out);
    });
});
