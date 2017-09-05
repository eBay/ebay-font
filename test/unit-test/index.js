'use strict';

require('marko/node-require').install();
var expect = require('chai').expect;
var renderer = require('../../font/marketsans/');

describe('ebay-font ', function () {
    it('should render template with <style> & <script>', function (done) {
        var out = function (err, output) {
            if (err) {
                done(err);
            }
            expect(output).not.to.be.empty;
            done();
        };
        out.global = {};
        renderer({}, out);
    });
});
