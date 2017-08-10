'use strict';
var lassoLoader = require('lasso-loader').async;

/* Font Face loader */
(function () {
    function fontLoader () {
        var fontFaceSet = document.fonts;
        if (fontFaceSet && fontFaceSet.load) {
            fontFaceSet.load('1em Market Sans').then(function() {
                updateLocalStorage();
            });
        } else if (FontFaceObserver) {
            var marketsans = new FontFaceObserver('Market Sans');
            if (marketsans && marketsans.load) {
                marketsans.load().then(function () {
                    updateLocalStorage();
                });
            }
        }
    }
    function updateLocalStorage () {
        if (localStorage && !localStorage.getItem('ebay-font-class')) {
            localStorage.setItem('ebay-font-class', true);
        }	
    }
    fontLoader();
})();

function init() {
    window.addEventListener('load', function () {
        if (localStorage && !localStorage.getItem('ebay-font-class')) {
            //check for fontfaceset else load polyfill before invoking fontloader
            var fontFaceSet = document.fonts;
            if (fontFaceSet && fontFaceSet.load) {
                lassoLoader('font-async-loader', function (err) {});
            } else {
                lassoLoader('font-async-observer', function (err) {});
            }
        }
    });
}
module.exports = require('marko-widgets').defineWidget({
    init: init
});

