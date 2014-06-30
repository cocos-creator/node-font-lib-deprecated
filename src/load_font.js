var Fs = require('fs');
var Ft = require('freetype2');

module.exports = function (filePath) {
    var buffer = Fs.readFileSync(filePath);
    var font = Ft.New_Memory_Face(buffer, 0);
    if (!font) {
        console.error('failed to load ' + filePath);
        return null;
    }
    else {
        // IMPORTANT! keep the memory block while font still surviving, otherwise freetype will crash
        font._fileBuffer = buffer;
    }
    var FontFace = font.constructor;
    var binded = !!FontFace.prototype.setSize;
    if (binded === false) {
        FontFace.prototype.setSize = function (pixelHeight) {
            Ft.Set_Pixel_Sizes(this, 0, pixelHeight);
        };
        FontFace.prototype.loadChar = function (char, loadFlags) {
            return Ft.Load_Char(this, char.charCodeAt(0), loadFlags) === 0;
        };
        FontFace.prototype.getAdvanceX = function (char) {
            if (Ft.Load_Char(this, char.charCodeAt(0), Ft.LOAD_NO_BITMAP | Ft.LOAD_NO_HINTING) === 0) {
                return this.glyph.metrics.horiAdvance / 64;
            }
            else {
                return null;
            }
        };
    }
    // TODO convert font info
    return font;
};