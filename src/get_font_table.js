var getFontList = (function () {

    var Path = require('path');
    var Fs = require('fs');
    //var Fontpath = require('fontpath');
    var GetFontName = require('./get_font_name');

    var FONT_DIRS = {
        win32: '/Windows/fonts',
        darwin: '/Library/Fonts',
        linux: '/usr/share/fonts/truetype'
    };
    var fontDir = Path.resolve(FONT_DIRS[process.platform]);
    //var fontDir = "C:\\Users\\123\\Desktop\\testFonts\\";

    // I have not tried each format, if not support Freetype will crash. In order to prevent this, just disable some of them first.
    var SUPPORT_FORMATS = ['ttf', 'ttc', 'otf', 'dfont'];   // ['pfa', 'pfb', 'cff', 'otc', 'bdf', 'pfr'];

    var getFontFamily = function (fonts, language) {

        var names = [];
        var paths = [];
        var dir = fontDir + Path.sep;

        for (var i = 0, len = fonts.length; i < len; i++) {
            var ext = Path.extname(fonts[i]).slice(1).toLowerCase();
            if (SUPPORT_FORMATS.indexOf(ext) === -1) {
                continue;
            }
            var filePath = dir + fonts[i];
            var fontName = GetFontName(filePath, language);
            var index = binaryIndexOf.call(names, fontName);
            if (index < 0) {
                names.splice(~index, 0, fontName);
                paths.splice(~index, 0, filePath);
            }
        }
        return {names: names, paths: paths};
    }
    
    return function (callback, language) {
        Fs.readdir(fontDir, function (err, files) {
            if (!err) {
                var fontFamilys = getFontFamily(files, language);
                callback(fontFamilys);
            }
            else {
                console.error(err);
            }
        });
    };
})();

/**
 * Modified from http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * - binaryIndexOf.call(someArray, searchElement);
 * @param {*} searchElement The item to search for within the sorted array.
 * @return {Number} The zero-based index of item in the array, if item is found; otherwise,
 *                  a negative number that is the bitwise complement of the index of
 *                  the next element that is larger than item or, if there is no larger element,
 *                  the bitwise complement of Count.
 */
function binaryIndexOf(searchElement) {
    'use strict';

    var minIndex = 0;
    var maxIndex = this.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = this[currentIndex];

        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }

    return ~minIndex;
}

module.exports = getFontList;