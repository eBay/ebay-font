/* eslint-disable no-var */
'use strict';

var template = require('./template.marko');

module.exports = function(input, out) {
    template.render(input, out);
};
