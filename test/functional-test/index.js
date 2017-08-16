'use strict';

require('marko/node-require').install();
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
var jsdom = require('mocha-jsdom');
var renderer = require('../../font/marketsans/renderer');
var desktop = {deviceInfo: {isLarge: true}};
chai.use(spies);


describe('ebay-font', function () {
    jsdom();
    function createEvent(type) {
        var event = document.createEvent('Event');
        event.initEvent(type, true, true);
        return event;
    }

    before(function () {
        var out = {};
        out.global = {};
        out.global.req = desktop;
        renderer.renderSync({}, out).appendTo(document.body);
    });
    after(function () {
        this.timeout(2000);
    });
    it('Check for font-marketsans > body ', function (done) {
        var styles = document.getElementsByTagName('style');
        expect(styles[0].innerHTML).to.include('\"Market Sans\"');
        expect(styles[0].innerHTML).to.include('font-marketsans > body ')        
        done();
    });
    it('Check for localstorage on page load ', function (done) {
        var classList = document.querySelector('html').classList.length;
        expect(classList).to.equals(0);
        var font = localStorage && localStorage.getItem('ebay-font');
        expect(font).to.be.null;
        done();
    });
    it('Check for localstorage onload event ', function (done) {
        Storage.prototype._setItem = Storage.prototype.setItem;        
        var setItem = function(key, value) {
            this._setItem(key, value);
        }
        var spySet = chai.spy(setItem);
        Storage.prototype.setItem = spySet;
        Storage.prototype._getItem = Storage.prototype.getItem;
        var getItem = function(key) {
            return this._getItem(key);
        };
        var spyGet = chai.spy(getItem);
        Storage.prototype.getItem = spyGet;
        var handler = function() {
            // expect(spySet).to.have.been.called();
            // expect(spyGet).to.have.been.called();
            // var classList = document.querySelector('html').classList;
            // expect(classList).to.equals(1);
            // var font = localStorage && localStorage.getItem('ebay-font');
            // expect(font).not.to.be.null;
            // expect(font).to.equals('font-marketsans');
            done();
        }
        addEventListener('load', handler);
        window.dispatchEvent(createEvent('load'));
    });
});