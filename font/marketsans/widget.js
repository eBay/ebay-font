'use strict';
var lassoLoader = require('lasso-loader').async;

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

