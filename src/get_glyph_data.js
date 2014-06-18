var Fs = require('fs');
var Ft = require('freetype2');

function getGlyphData (buffer, char, ptSize) {
    if (Buffer.isBuffer(buffer) === false) {
        buffer = Fs.readFileSync(buffer);
    }
    var face = Ft.New_Memory_Face(buffer, 0);
    if (!face) {
        return null;
    }
    var resolution = 72;
    ft.Set_Char_Size(face, ptSize << 6, ptSize << 6, resolution, resolution);
    var retval = {};
    
    //if ((face.face_flags & Ft.FACE_FLAG_SCALABLE) !== Ft.FACE_FLAG_SCALABLE)
    //    console.warn("Font is not scalable");
    
    //for (var i = 0, l = Ft.Get_Sfnt_Name_Count(face); i < l; i++) {
    //    var data = Ft.Get_Sfnt_Name(face, i);
    //    if (data && data.name_id === 4) {
    //        global.b = new Buffer(data.string, 'ascii');
    //        console.log(data);
    //    }
    //}
    
    language = language.toLowerCase();
    var getMacFirst = process.platform === 'darwin';
    var name = getFullName(getMacFirst, face, language);
    if (!name) {
        // fall back to nother platform
        name = getFullName( !getMacFirst, face, language);
    }
    if (name) {
        return name;
    }
    else {
        // failed to get fullname, simply return family name
        return face.family_name + " " + face.style_name;
    }
}

module.exports = getGlyphData;