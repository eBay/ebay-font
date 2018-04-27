/* global FontFaceObserver, Promise */
'use strict';

var fontFaceSet = document.fonts;
var FONT_CLASS_NAME = 'font-marketsans';
var FONT_FACE_OBSERVER_LIB = 'https://ir.ebaystatic.com/cr/v/c1/vendor/fontfaceobserver.js';

function lazyLoad(url, callback) {
    var scriptElem = document.createElement('script');
    scriptElem.type = 'application/javascript';
    scriptElem.async = true;
    scriptElem.onload = callback;
    scriptElem.src = url;

    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(scriptElem, firstScript);
}

function updateLocalStorage() {
    try {
        localStorage.setItem('ebay-font', FONT_CLASS_NAME);
    } catch (ex) {
        // Either localStorage not present or quota has exceeded
        // Another reason Safari private mode
        // https://stackoverflow.com/questions/14555347/html5-localstorage-error-with-safari-quota-exceeded-err-dom-exception-22-an
    }
}

/**
   * Check if FontFaceSet API is supported, along with some browser quirks
   * Mainly return false if the browser has the Safari 10 bugs. The
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
function isFontFaceSetCompatible() {
    var compatible = fontFaceSet && fontFaceSet.load;
    if (compatible && /Apple/.test(window.navigator.vendor)) {
        var match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);
        compatible = !(match && parseInt(match[1], 10) < 603);
    }
    return compatible;
}

function loadFont() {
    // check for fontfaceset else load polyfill before invoking fontloader
    if (isFontFaceSetCompatible()) {
        fontFaceSet.load('1em Market Sans');
        fontFaceSet.load('bold 1em Market Sans');
        fontFaceSet.ready.then(updateLocalStorage);
    } else {
        lazyLoad(FONT_FACE_OBSERVER_LIB, function() {
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
