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
