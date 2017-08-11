# font-ebay

This module is used to load ebay font(market sans) gracefully without impacting the site speed

## Features
It FaceFace(FaceFaceSet) if its supported in the browser else it uses polyfill to observe font if its loaded

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

font-ebay exposes a tag(`<ebay-font>`) to embed into <head> of the page. this tag injects tiny css and js into head to control the font

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
## Approach
  1. When user is landing first time on ebay, font would not be there
  2. Lazy load font asynchronously and Once its loaded, it update a flag into localstorage to remember next time
  3. When user go to different page or refresh the same page, localstorage flag will be read and start using it 
  
## How to test
 First timer user,
    1. will see ```font-family: "Helvetica Neue", Helvetica,Arial,Roboto,sans-serif```
    2. look at chrome dev tool > Application > localstorage 'ebay-font', 'font-marketsans'
 Repeated user,
     1. will see ```font-family: "Market Sans", "Helvetica Neue", Helvetica,Arial,Roboto,sans-serif```
     2. page will be loaded with market sans font
    
