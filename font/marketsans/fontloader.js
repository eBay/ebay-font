/* global FontFaceObserver, Promise */
'use strict';

var lassoLoader = require('lasso-loader').async;

var fontFaceSet = document.fonts;
var FONT_CLASS_NAME = 'font-marketsans';
var isSafari10 = null;

function updateLocalStorage() {
    if (localStorage) {
        localStorage.setItem('ebay-font', FONT_CLASS_NAME);
    }
}
function isSafari10Bug() {
    if (isSafari10 === null) {
        if (/Apple/.test(window.navigator.vendor)) {
            var match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);
            isSafari10 = !!match && parseInt(match[1], 10) < 603;
        } else {
            isSafari10 = false;
        }
    }
    return isSafari10;
}

function loadFont() {
    // check for fontfaceset else load polyfill before invoking fontloader
    if (fontFaceSet && fontFaceSet.load && !isSafari10Bug()) {
        fontFaceSet.load('1em Market Sans');
        fontFaceSet.load('bold 1em Market Sans');
        fontFaceSet.ready.then(updateLocalStorage);
    } else {
        lassoLoader('font-async-observer', function(err) {
            if (err) {
                return;
            }
            var marketsansRegular = new FontFaceObserver('Market Sans');
            var marketsansBold = new FontFaceObserver('Market Sans', { weight: 'bold' });
            Promise.all([marketsansRegular.load(), marketsansBold.load()]).then(updateLocalStorage);
        });
    }
}

function isFontLoaded() {
    return (('fontDisplay' in document.documentElement.style) ||
        (localStorage && localStorage.getItem('ebay-font') === FONT_CLASS_NAME));
}

function init() {
    // Initialize font loader only if it is not loaded previously
    if (!isFontLoaded()) {
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
