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
/**
   * Returns true if the browser has the Safari 10 bugs. The
   * native font load API in Safari 10 has two bugs that cause
   * the document.fonts.load and FontFace.prototype.load methods
   * to return promises that don't reliably get fired.
   *
   * The bugs are described in more detail here:
   *  - https://bugs.webkit.org/show_bug.cgi?id=165037
   *  - https://bugs.webkit.org/show_bug.cgi?id=164902
   *
   * If the browser is made by Apple, and has native font
   * loading support, it is potentially affected. But the API
   * was fixed around AppleWebKit version 603, so any newer
   * versions that that does not contain the bug.
   *
   * @return {boolean}
*/
function isCompatible() {
    var isCompatible = false;
    if (/Apple/.test(window.navigator.vendor)) {
        var match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);
        isCompatible = !!match && parseInt(match[1], 10) < 603;
    }
    return isCompatible;
}

function loadFont() {
    // check for fontfaceset else load polyfill before invoking fontloader
    if (fontFaceSet && fontFaceSet.load && !isCompatible()) {
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
