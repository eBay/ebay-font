'use strict';

const { join } = require('path');
const mkdirp = require('mkdirp');
const uglifyJS = require('uglify-js');
const { readFileSync, writeFileSync } = require('fs');

const rootPath = join(__dirname, '..');
const destPath = join(rootPath, 'dist');
const fontloaderStandaloneFile = join(destPath, 'fontloader.standalone.js');

function getFileContent(filePath) {
    try {
        const fileContent = readFileSync(filePath, 'utf8');
        if (!fileContent) {
            console.log(`${filePath} is empty`);
            process.exit(1);
        }
        return fileContent;
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    return '';
}

function wrapInIIFE(body) {
    return `
        ;(function() {
            ${body}
        }());
    `;
}

function getFontLoaderCode() {
    const fontLoaderLogic = getFileContent(join(rootPath, 'font/marketsans/fontloader.js'));

    // Minify the content
    const { code, error } = uglifyJS.minify(fontLoaderLogic);

    if (error) {
        console.log(`Uglify task failed`);
        process.exit(1);
    }

    return code;
}

function generateFile() {
    mkdirp(destPath, err => {
        if (err) {
            console.log(err);
            process.exit(err.code);
        }

        // Wrap fontloader code in IIFE
        const fontLoaderCode = getFontLoaderCode();
        const fontLoaderIIFE = wrapInIIFE(fontLoaderCode);

        writeFileSync(fontloaderStandaloneFile, fontLoaderIIFE, 'utf8');
    });
}

generateFile();

