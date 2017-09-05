# font-ebay

It is used to load custom font(market sans) gracefully without impacting the site speed. it uses [FaceFaceSet](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet) to load font which is supported by most of the modern browsers. If FontFaceSet does not exist, it uses [fontfaceobserver](https://github.com/bramstein/fontfaceobserver/blob/master/fontfaceobserver.js) as a polyfill.


## Installation

1. Install the module into your project
```sh
npm install ebay-font --save
```
2. Add dependencies into page browser.json
```
"ebay-font/browser.json"
```

## Usage

font-ebay exposes a tag(`<ebay-font>`) to embed into <head> of the page. this tag injects tiny js(230bytes gzipped) into head to check if font is already loaded by checking a flag(ebay-font) on localstorage

## Example

```html
<head>
...
<font-ebay>
</head>
<body>
...
...
```

## Font loading strategy
We explored many options to load fonts including the one captured by [Zach Leatherman](https://www.zachleat.com/web/comprehensive-webfonts/). we followed following principle to choose the best strategy,

  1. No FOUT/FOIT to users
  2. No render blocking
  3. Cache the font to avoid extra http call(make use of browser cache for repeated users)
  4. Zero site speed impact while loading font
  5. Progressive enhancement (use as native as possible)
  6. Let CSS format rule to decide what kind of font should be loaded
  ```
    @font-face {
      font-family: 'MyWebFont';
      src: url('webfont.eot'); /* IE9 Compat Modes */
      src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
           url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
           url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
           url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
    }
```

## Adopted approach
  1. Page will load with default font which should be as much close as possible to custom font. If [skin-ebay](https://ebay.github.io/skin/) is used in the page, default font-family would be set to <body> as `font-family:'Helvetica Neue', Helvetica, Arial, Roboto, sans-serif`; and use ebay-font in the application which will take care of the rest.
  2. ebay-font inject tiny script and css into <head> of the page which will check if font is already exist in the page. if so, it adds a css class into <html>. Once this css is added, custom font is starting to be used. 
 3. Along with #2, it inject script at bottom of the page by [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to load font asynchronously using [lasso-loader](https://github.com/lasso-js/lasso-loader)
  
## Cons
Custom font will not be shown to first time users. 

## How to test
 ### First timer user,
   1. will see `font-family: "Helvetica Neue", Helvetica,Arial,Roboto,sans-serif`
   2. look at chrome dev tool > Application > localstorage 'ebay-font', 'font-marketsans'
 ### Repeated user,
   1. will see `font-family: "Market Sans", "Helvetica Neue", Helvetica,Arial,Roboto,sans-serif`
   2. page will be loaded with market sans font