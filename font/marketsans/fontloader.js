'use strict';
var lassoLoader = require('lasso-loader').async;

function fontLoader (isFontFaceSupported) {
    if (isFontFaceSupported) {
        document.fonts.load('1em Market Sans').then(function() {
            updateLocalStorage();
        });
    } else {
        var marketsans = new FontFaceObserver('Market Sans');
        if (marketsans && marketsans.load) {
            marketsans.load().then(function () {
                updateLocalStorage();
            });
        }
    }
}
function updateLocalStorage () {
    if (localStorage && !localStorage.getItem('ebay-font')) {
        localStorage.setItem('ebay-font', 'font-marketsans');
    }	
}
function loadFont() {
        //check for fontfaceset else load polyfill before invoking fontloader
        var fontFaceSet = document.fonts;
        if (fontFaceSet && fontFaceSet.load) {
            fontLoader(true);
        } else {
            lassoLoader('font-async-observer', function (err) {
                fontLoader();
            });
        }
}
function init() {
    if (localStorage && !localStorage.getItem('ebay-font')) {
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
