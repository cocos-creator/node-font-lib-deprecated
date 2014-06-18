var Fs = require('fs');
var Ft = require('freetype2');

var localNameToLcid_win = { 'af': 54, 'af-za': 1078, 'sq': 28, 'sq-al': 1052, 'gsw': 132, 'gsw-fr': 1156, 'am': 94, 'am-et': 1118, 'ar': 1, 'ar-dz': 5121, 'ar-bh': 15361, 'ar-eg': 3073, 'ar-iq': 2049, 'ar-jo': 11265, 'ar-kw': 13313, 'ar-lb': 12289, 'ar-ly': 4097, 'ar-ma': 6145, 'ar-om': 8193, 'ar-qa': 16385, 'ar-sa': 1025, 'ar-sy': 10241, 'ar-tn': 7169, 'ar-ae': 14337, 'ar-ye': 9217, 'hy': 43, 'hy-am': 1067, 'as': 77, 'as-in': 1101, 'az': 44, 'az-cyrl': 29740, 'az-cyrl-az': 2092, 'az-latn': 30764, 'az-latn-az': 1068, 'ba': 109, 'ba-ru': 1133, 'eu': 45, 'eu-es': 1069, 'be': 35, 'be-by': 1059, 'bn': 69, 'bn-bd': 2117, 'bn-in': 1093, 'bs': 30746, 'bs-cyrl': 25626, 'bs-cyrl-ba': 8218, 'bs-latn': 26650, 'bs-latn-ba': 5146, 'br': 126, 'br-fr': 1150, 'bg': 2, 'bg-bg': 1026, 'ca': 3, 'ca-es': 1027, 'zh': 30724, 'zh-hans': 4, 'zh-cn': 2052, 'zh-sg': 4100, 'zh-hant': 31748, 'zh-hk': 3076, 'zh-mo': 5124, 'zh-tw': 1028, 'co': 131, 'co-fr': 1155, 'hr': 26, 'hr-hr': 1050, 'hr-ba': 4122, 'cs': 5, 'cs-cz': 1029, 'da': 6, 'da-dk': 1030, 'prs': 140, 'prs-af': 1164, 'dv': 101, 'dv-mv': 1125, 'nl': 19, 'nl-be': 2067, 'nl-nl': 1043, 'en': 9, 'en-au': 3081, 'en-bz': 10249, 'en-ca': 4105, 'en-029': 9225, 'en-in': 16393, 'en-ie': 6153, 'en-jm': 8201, 'en-my': 17417, 'en-nz': 5129, 'en-ph': 13321, 'en-sg': 18441, 'en-za': 7177, 'en-tt': 11273, 'en-gb': 2057, 'en-us': 1033, 'en-zw': 12297, 'et': 37, 'et-ee': 1061, 'fo': 56, 'fo-fo': 1080, 'fil': 100, 'fil-ph': 1124, 'fi': 11, 'fi-fi': 1035, 'fr': 12, 'fr-be': 2060, 'fr-ca': 3084, 'fr-fr': 1036, 'fr-lu': 5132, 'fr-mc': 6156, 'fr-ch': 4108, 'fy': 98, 'fy-nl': 1122, 'gl': 86, 'gl-es': 1110, 'ka': 55, 'ka-ge': 1079, 'de': 7, 'de-at': 3079, 'de-de': 1031, 'de-li': 5127, 'de-lu': 4103, 'de-ch': 2055, 'el': 8, 'el-gr': 1032, 'kl': 111, 'kl-gl': 1135, 'gu': 71, 'gu-in': 1095, 'ha': 104, 'ha-latn': 31848, 'ha-latn-ng': 1128, 'he': 13, 'he-il': 1037, 'hi': 57, 'hi-in': 1081, 'hu': 14, 'hu-hu': 1038, 'is': 15, 'is-is': 1039, 'ig': 112, 'ig-ng': 1136, 'id': 33, 'id-id': 1057, 'iu': 93, 'iu-latn': 31837, 'iu-latn-ca': 2141, 'iu-cans': 30813, 'iu-cans-ca': 1117, 'ga': 60, 'ga-ie': 2108, 'xh': 52, 'xh-za': 1076, 'zu': 53, 'zu-za': 1077, 'it': 16, 'it-it': 1040, 'it-ch': 2064, 'ja': 17, 'ja-jp': 1041, 'kn': 75, 'kn-in': 1099, 'kk': 63, 'kk-kz': 1087, 'km': 83, 'km-kh': 1107, 'qut': 134, 'qut-gt': 1158, 'rw': 135, 'rw-rw': 1159, 'sw': 65, 'sw-ke': 1089, 'kok': 87, 'kok-in': 1111, 'ko': 18, 'ko-kr': 1042, 'ky': 64, 'ky-kg': 1088, 'lo': 84, 'lo-la': 1108, 'lv': 38, 'lv-lv': 1062, 'lt': 39, 'lt-lt': 1063, 'dsb': 31790, 'dsb-de': 2094, 'lb': 110, 'lb-lu': 1134, 'mk-mk': 1071, 'mk': 47, 'ms': 62, 'ms-bn': 2110, 'ms-my': 1086, 'ml': 76, 'ml-in': 1100, 'mt': 58, 'mt-mt': 1082, 'mi': 129, 'mi-nz': 1153, 'arn': 122, 'arn-cl': 1146, 'mr': 78, 'mr-in': 1102, 'moh': 124, 'moh-ca': 1148, 'mn': 80, 'mn-cyrl': 30800, 'mn-mn': 1104, 'mn-mong': 31824, 'mn-mong-cn': 2128, 'ne': 97, 'ne-np': 1121, 'no': 20, 'nb': 31764, 'nn': 30740, 'nb-no': 1044, 'nn-no': 2068, 'oc': 130, 'oc-fr': 1154, 'or': 72, 'or-in': 1096, 'ps': 99, 'ps-af': 1123, 'fa': 41, 'fa-ir': 1065, 'pl': 21, 'pl-pl': 1045, 'pt': 22, 'pt-br': 1046, 'pt-pt': 2070, 'pa': 70, 'pa-in': 1094, 'quz': 107, 'quz-bo': 1131, 'quz-ec': 2155, 'quz-pe': 3179, 'ro': 24, 'ro-ro': 1048, 'rm': 23, 'rm-ch': 1047, 'ru': 25, 'ru-ru': 1049, 'smn': 28731, 'smj': 31803, 'se': 59, 'sms': 29755, 'sma': 30779, 'smn-fi': 9275, 'smj-no': 4155, 'smj-se': 5179, 'se-fi': 3131, 'se-no': 1083, 'se-se': 2107, 'sms-fi': 8251, 'sma-no': 6203, 'sma-se': 7227, 'sa': 79, 'sa-in': 1103, 'gd': 145, 'gd-gb': 1169, 'sr': 31770, 'sr-cyrl': 27674, 'sr-cyrl-ba': 7194, 'sr-cyrl-me': 12314, 'sr-cyrl-cs': 3098, 'sr-cyrl-rs': 10266, 'sr-latn': 28698, 'sr-latn-ba': 6170, 'sr-latn-me': 11290, 'sr-latn-cs': 2074, 'sr-latn-rs': 9242, 'nso': 108, 'nso-za': 1132, 'tn': 50, 'tn-za': 1074, 'si': 91, 'si-lk': 1115, 'sk': 27, 'sk-sk': 1051, 'sl': 36, 'sl-si': 1060, 'es': 10, 'es-ar': 11274, 'es-bo': 16394, 'es-cl': 13322, 'es-co': 9226, 'es-cr': 5130, 'es-do': 7178, 'es-ec': 12298, 'es-sv': 17418, 'es-gt': 4106, 'es-hn': 18442, 'es-mx': 2058, 'es-ni': 19466, 'es-pa': 6154, 'es-py': 15370, 'es-pe': 10250, 'es-pr': 20490, 'es-es': 3082, 'es-us': 21514, 'es-uy': 14346, 'es-ve': 8202, 'sv': 29, 'sv-fi': 2077, 'sv-se': 1053, 'syr': 90, 'syr-sy': 1114, 'tg': 40, 'tg-cyrl': 31784, 'tg-cyrl-tj': 1064, 'tzm': 95, 'tzm-latn': 31839, 'tzm-latn-dz': 2143, 'ta': 73, 'ta-in': 1097, 'tt': 68, 'tt-ru': 1092, 'te': 74, 'te-in': 1098, 'th': 30, 'th-th': 1054, 'bo': 81, 'bo-cn': 1105, 'tr': 31, 'tr-tr': 1055, 'tk': 66, 'tk-tm': 1090, 'uk': 34, 'uk-ua': 1058, 'hsb': 46, 'hsb-de': 1070, 'ur': 32, 'ur-pk': 1056, 'ug': 128, 'ug-cn': 1152, 'uz-cyrl': 30787, 'uz-cyrl-uz': 2115, 'uz': 67, 'uz-latn': 31811, 'uz-latn-uz': 1091, 'vi': 42, 'vi-vn': 1066, 'cy': 82, 'cy-gb': 1106, 'wo': 136, 'wo-sn': 1160, 'sah': 133, 'sah-ru': 1157, 'ii': 120, 'ii-cn': 1144, 'yo': 106, 'yo-ng': 1130, };
var localNameToLcid_mac = { 'en': 0, 'fr': 1, 'de': 2, 'it': 3, 'nl': 4, 'sv': 5, 'es': 6, 'da': 7, 'pt': 8, 'nb': 9, 'he': 10, 'ja': 11, 'ar': 12, 'fi': 13, 'el': 14, 'is': 15, 'mt': 16, 'tr': 17, 'hr': 18, /*'zh-hant': 19,*/ 'ur': 20, 'hi': 21, 'th': 22, 'ko': 23, 'lt': 24, 'pl': 25, 'hu': 26, 'et': 27, 'lv': 28, 'se': 29, 'fo': 30, 'fa': 31, 'ru': 32, /*'zh-hans': 33,*/ 'nl': 34, 'ga': 35, 'sq': 36, 'ro': 37, 'cs': 38, 'sk': 39, 'sl': 40, 'yi': 41, 'sr': 42, 'mk': 43, 'bg': 44, 'uk': 45, 'be': 46, 'uz': 47, 'kk': 48, /*'az-cyrl': 49, 'az-arab': 50,*/ 'hy': 51, 'ka': 52, 'mo': 53, 'ky': 54, 'tg': 55, 'tk': 56, /*'mn-mong': 57, 'mn-cyrl': 58,*/ 'ps': 59, 'ku': 60, 'ks': 61, 'sd': 62, 'bo': 63, 'ne': 64, 'sa': 65, 'mr': 66, 'bn': 67, 'as': 68, 'gu': 69, 'pa': 70, 'or': 71, 'ml': 72, 'kn': 73, 'ta': 74, 'te': 75, 'si': 76, 'my': 77, 'km': 78, 'lo': 79, 'vi': 80, 'id': 81, 'tl': 82, /*'ms-latn': 83, 'ms-arab': 84,*/ 'am': 85, 'ti': 86, 'om': 87, 'so': 88, 'sw': 89, 'rw': 90, 'rn': 91, 'ny': 92, 'mg': 93, 'eo': 94, 'cy': 128, 'eu': 129, 'ca': 130, 'la': 131, 'qu': 132, 'gn': 133, 'ay': 134, 'tt': 135, 'ug': 136, 'dz': 137, /*'jv-latn': 138, 'su-latn': 139,*/ 'jv': 138, 'su': 139, 'gl': 140, 'af': 141, 'br': 142, 'iu': 143, 'gd': 144, 'gv': 145, 'ga': 146, 'to': 147, 'el': 148, 'kl': 149, /*'az-latn': 150,*/ 'nn': 151, };
var TT_PLATFORM_MACINTOSH = 1;
var TT_PLATFORM_MICROSOFT = 3;

function getMacLcid (language) {
    // %ISO_639-1% + "-" + %ISO 3166-1%
    var la = language.slice(0, 2);
    if (la === 'zh') {
        return language === 'zh-cn' ? 33 : 19;
    }
    else {
        return localNameToLcid_mac[la];
    }
}

function getWinLcid (language) {
    return localNameToLcid_win[language];
}

function doGetFullName (face, platform, lcid) {
    var data = Ft.Get_Sfnt_Full_Name(face, platform, lcid);
    if (data) {
        //console.log(data.encoding);
        if (data.encoding === 'ucs2') {
            data.name = new Buffer(data.name, 'ascii').toString('utf16le');
        }
        return data.name;
    }
}

function getFullName (mac_else_win, face, language) {
    // get user local id
    var lcid = mac_else_win ? getMacLcid(language) : getWinLcid(language);
    // get user platform id
    var platform = mac_else_win ? TT_PLATFORM_MACINTOSH : TT_PLATFORM_MICROSOFT;
    // try user local id
    if (lcid) {
        var name = doGetFullName(face, platform, lcid);
        if (name) {
            return name;
        }
    }
    // if failed, fall back to english
    language = mac_else_win ? 'en' : 'en-us';
    lcid = mac_else_win ? getMacLcid(language) : getWinLcid(language);
    if (lcid) {
        return doGetFullName(face, platform, lcid);
    }
}

function getFontName (buffer, language) {
    if (Buffer.isBuffer(buffer) === false) {
        buffer = Fs.readFileSync(buffer);
    }
    var face = Ft.New_Memory_Face(buffer, 0);
    if (!face) {
        return null;
    }
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

module.exports = getFontName;