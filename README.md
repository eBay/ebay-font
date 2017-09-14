# ebay-font [![Build Status](https://travis-ci.org/eBay/ebay-font.svg?branch=master)](https://travis-ci.org/eBay/ebay-font) 

`ebay-font` is the module used at eBay to load custom web fonts. It uses a strategy to avoid both [FOUT](https://www.zachleat.com/web/webfont-glossary/#fout) and [FOIT](https://www.zachleat.com/web/webfont-glossary/#foit). This can be considered equivalent to the new CSS [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) descriptor [`font-display: optional;`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display#values). Unfortunately, `font-display` is relatively new and hence its [adoption](http://caniuse.com/#search=font-display) among browsers is not widespread. So for now, this module leverages [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`FontFaceSet`](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet) API and the [Font Face Observer](https://github.com/bramstein/fontfaceobserver) utility (as a backup if `FontFaceSet` API is not present) to provide the same functionality as `font-display: optional;`.

`ebay-font` is paired along with eBay's custom font 'Market Sans'. But feel free to change it to any custom font URL of your choice.

Please refer to the detailed blog post "[eBay’s Font Loading Strategy]()" for a full overview of how this module works. 

## Usage

### 
### Standalone
1. Copy paste this CSS and JavaScript tag [snippet](https://github.com/eBay/ebay-font/blob/master/font/marketsans/template.marko) in the `<head>` tag of your page

1. Include this JavaScript file [TODO]() in the footer
```JavaScript
<script async src="TODO"></script>
```

## Browser support
* Chrome (desktop & Android)
* Firefox
* Opera
* Safari (desktop & iOS)
* IE8+
* Android WebKit

## Issues
Have a bug or a feature request? [Please open a new issue](https://github.com/eBay/ebay-font/issues)

## License 
Copyright (c) 2017 eBay Inc.

Released under the [MIT](http://www.opensource.org/licenses/MIT) License
