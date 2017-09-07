/* global FontFaceObserver */
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
    if (fontFaceSet) {
        fontFaceSet.load('1em Market Sans').then(updateLocalStorage);
    } else {
        lassoLoader('font-async-observer', function() {
            var marketsans = new FontFaceObserver('Market Sans');
            marketsans.load().then(updateLocalStorage);
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
