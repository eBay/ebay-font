'use strict';

require('marko/node-require').install();
var expect = require('chai').expect;
var template = require('../../font/marketsans/index.marko').default;

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
        template.render({}, out);
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
        template.render({ nonce: 'test-123' }, out);
    });
});
