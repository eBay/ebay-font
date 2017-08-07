'use strict';

var template = require('./template.marko');

function getTemplateData(state, input) {
    return input;
}

exports = module.exports = require('marko-widgets').defineRenderer({
    template: template,
    getTemplateData: getTemplateData
});
