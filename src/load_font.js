module.exports = function (filePath) {
    var Fs = require('fs');
    var Ft = require('freetype2');

    var buffer = Fs.readFileSync(filePath);
    var font = Ft.New_Memory_Face(buffer, 0);
    if (!font) {
        return null;
    }
    else {
        // IMPORTANT! keep the memory block while font still surviving, otherwise freetype will crash
        font._fileBuffer = buffer;
    }
    var FreeType = font.constructor;
    var binded = !!FreeType.prototype.setSize;
    if (binded === false) {
        FreeType.prototype.setSize = function (pixelHeight) {
            Ft.Set_Pixel_Sizes(this, 0, pixelHeight);
        };
        FreeType.prototype.loadChar = function (char, loadFlags) {
            Ft.Load_Char(this, char.charCodeAt(0), loadFlags);
        };
        FreeType.prototype.getAdvanceX = function (char) {
            Ft.Load_Char(this, char.charCodeAt(0), Ft.LOAD_NO_BITMAP | Ft.LOAD_NO_HINTING);
            return this.glyph.metrics.horiAdvance / 64;
        };
    }
    // TODO convert font info
    return font;
};