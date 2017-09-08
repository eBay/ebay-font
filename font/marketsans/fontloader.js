/* global FontFaceObserver, Promise */
'use strict';

var lassoLoader = require('lasso-loader').async;

var fontFaceSet = document.fonts;
var FONT_CLASS_NAME = 'font-marketsans';

function updateLocalStorage() {
    if (localStorage) {
        localStorage.setItem('ebay-font', FONT_CLASS_NAME);
    }
}

function loadFont() {
    // check for fontfaceset else load polyfill before invoking fontloader
    if (fontFaceSet && fontFaceSet.load) {
        fontFaceSet.load('1em Market Sans');
        fontFaceSet.load('bold 1em Market Sans');
        fontFaceSet.ready.then(updateLocalStorage);
    } else {
        lassoLoader('font-async-observer', function() {
            var marketsansRegular = new FontFaceObserver('Market Sans');
            var marketsansBold = new FontFaceObserver('Market Sans', { weight: 'bold' });
            Promise.all([marketsansRegular.check(), marketsansBold.check()]).then(updateLocalStorage);
        });
    }
}

function init() {
    if (localStorage && localStorage.getItem('ebay-font') !== FONT_CLASS_NAME) {
        window.addEventListener('load', function() {
            if (requestAnimationFrame) {
                requestAnimationFrame(loadFont);
            } else {
                loadFont();
            }
        });
    }
}
init();
