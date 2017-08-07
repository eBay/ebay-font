'use strict';
var lassoLoader = require('lasso-loader').async;

function invokeFontLoader () {
    lassoLoader('font-async-loader', function (err) {});
}
function init() {
    window.addEventListener('load', function () {
        if (localStorage && !localStorage.getItem('ebay-font-class')) {
            //check for fontfaceset else load polyfill before invoking fontloader
            var fontFaceSet = document.fonts;
            if (fontFaceSet && fontFaceSet.load) {
                invokeFontLoader();
            } else {
                lassoLoader('font-async-observer', function (err) {
                    invokeFontLoader();
                });
            }
        }
    });
}
module.exports = require('marko-widgets').defineWidget({
    init: init
});

