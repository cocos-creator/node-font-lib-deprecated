var Fs = require('fs');
var Ft = require('freetype2');

module.exports = function (filePath) {
    var buffer = Fs.readFileSync(filePath);
    var face = Ft.New_Memory_Face(buffer, 0);
    if (!face) {
        return null;
    }
    var font = face;
    // TODO convert font info
    return font;
};