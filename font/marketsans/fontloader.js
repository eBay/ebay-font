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