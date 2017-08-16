module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '',
        frameworks: ['lasso', 'mocha', 'chai'],
        lasso: {
            plugins: [
                'lasso-less',
                'lasso-marko',
            ],
            minify: false,
            bundlingEnabled: false,
            resolveCssUrls: true,
            cacheProfile: 'test',
            tempdir: './.test'
        },
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-lasso',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher'
        ],
        files: [
            {
                pattern: 'test/functional-test/*.js',
                included: true,
                nocache: false
            }
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,
        browsers: ['PhantomJS']
    });
};