/**
 * 常用的功能性封装
 */
;(function (w) {
	w.String.prototype.toHHString = function () {
		return HHString(this);
	};
	
	/**
	 * 合并对象
	 * @param obj
	 * @param value
	 * @param full
	 * @returns {*}
	 * @private
	 */
	function _merge(obj, value, full) {
		obj = obj ? obj : {};
		for (var k in value) {
			if (full || value.hasOwnProperty(k)) {
				obj[k] = value[k];
			}
		}
		
		return obj;
	}
	
	var hh_data_types = {
		'string': Object.prototype.toString.call(''),
		'array': Object.prototype.toString.call([]),
		'object': Object.prototype.toString.call({}),
		'number': Object.prototype.toString.call(1.0),
		'date': Object.prototype.toString.call(new Date()),
		'regexp': Object.prototype.toString.call(/a/),
		'undefined': Object.prototype.toString.call(),
		'function': Object.prototype.toString.call(function () {
		}),
		'bool': Object.prototype.toString.call(true)
	};
	
	w.HH = (function () {
		return new function () {
			var o = this;
			
			~function () {
				_merge(o, (function () {
					function _if(cond, trueVal, falseVal) {
						return !!cond ? trueVal : falseVal;
					}
					
					function _iffalse(v, falseVal) {
						return _if(v, v, falseVal)
					}
					
					function _iftrue(v, trueVal) {
						return _if(v, trueVal, v)
					}
					
					function _ifudf(v, falseVal) {
						return _if(_isNotUndefined(v), v, falseVal)
					}
					
					function _isString(v) {
						return Object.prototype.toString.call(v) === hh_data_types.string;
					}
					
					function _isArray(v) {
						return Object.prototype.toString.call(v) === hh_data_types.array;
					}
					
					function _isSimpleObject(v) {
						return Object.prototype.toString.call(v) === hh_data_types.object;
					}
					
					function _isNumber(v) {
						return Object.prototype.toString.call(v) === hh_data_types.number;
					}
					
					function _isDate(v) {
						return Object.prototype.toString.call(v) === hh_data_types.date;
					}
					
					function _isFalse(v) {
						return !v;
					}
					
					function _isTrue(v) {
						return !_isFalse(v);
					}
					
					function _isRegExp(v) {
						return Object.prototype.toString.call(v) === hh_data_types.regexp;
					}
					
					function _isEmpty(v) {
						if (_isSimpleObject(v)) {
							for (var i in v) {
								if (v.hasOwnProperty(i)) return false;
							}
							return true;
						}
						
						return _isUndefined(v) || v === null || v === false
							|| v === '' || (_isArray(v) && v.length === 0);
					}
					
					function _isBool(v) {
						return Object.prototype.toString.call(v) === hh_data_types.bool;
					}
					
					function _isHTMLElement(v) {
						return /^\[object HTML([a-zA-Z0-9]+?)Element]$/.test(Object.prototype.toString.call(v));
					}
					
					function _isUndefined(v) {
						return Object.prototype.toString.call(v) === hh_data_types.undefined;
					}
					
					function _isFunction(v) {
						return Object.prototype.toString.call(v) === hh_data_types.function;
					}
					
					function _isNotString(v) {
						return !_isString(v)
					}
					
					function _isNotArray(v) {
						return !_isArray(v)
					}
					
					function _isNotSimpleObject(v) {
						return !_isSimpleObject(v)
					}
					
					function _isNotNumber(v) {
						return !_isNumber(v)
					}
					
					function _isNotDate(v) {
						return !_isDate(v)
					}
					
					function _isNotFalse(v) {
						return !_isFalse(v)
					}
					
					function _isNotRegExp(v) {
						return !_isRegExp(v)
					}
					
					function _isNotTrue(v) {
						return !_isTrue(v)
					}
					
					function _isNotEmpty(v) {
						return !_isEmpty(v)
					}
					
					function _isNotBool(v) {
						return !_isBool(v)
					}
					
					function _isNotHTMLElement(v) {
						return !_isHTMLElement(v)
					}
					
					function _isNotUndefined(v) {
						return !_isUndefined(v)
					}
					
					function _isNotFunction(v) {
						return !_isFunction(v)
					}
					
					function _clone(obj) {
						if (_isString(obj) || _isNumber(obj) || _isUndefined(obj) ||
							_isBool(obj) || _isHTMLElement(obj)) {
							return obj;
						}
						
						if (_isDate(obj)) {
							return new Date(obj.getTime());
						}
						
						if (_isRegExp(obj)) {
							return new RegExp(obj);
						}
						
						if (_isArray(obj)) {
							return obj.slice(0);
						} else {
							var newObj = null;
							if (_isFunction(obj.constructor)) {
								newObj = new obj.constructor();
							} else {
								newObj = new obj.__proto__.constructor();
							}
							
							for (var k in obj) {
								newObj[k] = obj[k];
							}
						}
						
						return newObj;
					}
					
					/**
					 * 遍历对象或数组
					 * @param obj
					 * @param f
					 * @returns {{}|*}
					 * @private
					 */
					function _foreach(obj, f) {
						if (_isNotFunction(f)) {
							return o;
						}
						
						if (_isFalse(obj) || _isEmpty(obj)) {
							return o;
						}
						
						var index = 0;
						
						if (_isArray(obj)) {
							for (var k = 0; k < obj.length; k++) {
								if (f.call(obj, obj[k], k, index++) === false) {
									break;
								}
							}
						} else {
							for (var i in obj) {
								if (obj.hasOwnProperty(i)) {
									if (f.call(obj, obj[i], i, index++) === false) {
										break;
									}
								}
							}
						}
						
						return o;
					}
					
					/**
					 * 遍历对象并对对象元素重新赋值
					 * @param obj
					 * @param f
					 * @returns {{}|*}
					 * @private
					 */
					function _map(obj, f) {
						if (_isNotFunction(f)) {
							return o;
						}
						
						if (_isFalse(obj) || _isEmpty(obj)) {
							return o;
						}
						
						if (_isArray(obj)) {
							obj.map(f);
							return o;
						} else {
							for (var i in obj) {
								if (obj.hasOwnProperty(i)) {
									obj[i] = f(obj[i], i, obj);
								}
							}
						}
						
						return o;
					}
					
					/**
					 * 随机数生产, 类似php mt_rand()
					 * @param min
					 * @param max
					 * @returns {number}
					 * @private
					 */
					var _randSeed = Math.round(Math.random() * 1000000);
					
					function _rand(min, max) {
						min = Number(min);
						max = Number(max);
						_randSeed = (_randSeed * 9301 + 49297) % 233280;
						var rndFloat = _randSeed / 233280.0;
						
						if (0 == max) {
							return rndFloat;
						}
						
						return Math.ceil((min - 1) + rndFloat * (max - min + 1));
					}
					
					function _srand(seed) {
						_randSeed = seed;
						return o;
					}
					
					/**
					 * json编码
					 * @param v
					 * @private
					 */
					function _jsonEncode(v) {
						return JSON.stringify(v);
					}
					
					/**
					 * json 解码
					 * @param v
					 * @private
					 */
					function _jsonDecode(v) {
						return JSON.parse(v);
					}
					
					function _strReplace(find, replace, str, once) {
						return __replace(str, find, replace, once, false, false);
					}
					
					function _strIReplace(find, replace, str, once) {
						return __replace(str, find, replace, once, false, true);
					}
					
					function _pregReplace(find, replace, str) {
						return __replace(str, find, replace, null, true, null);
					}
					
					/**
					 * 字符串搜索
					 * @param str 待搜索字符串母串
					 * @param searchs 需要替换的字符串或者正则表达式
					 * @param replace 替换体
					 * @param once 是否只替换一次
					 * @param useReg 是否是用正则表达式
					 * @param ignoreCase 忽略大小写
					 * @returns {*}
					 * @private
					 */
					function __replace(str, searchs, replace, once, useReg, ignoreCase) {
						str = String(str);
						
						if (o.isEmpty(searchs)) {
							return str;
						}
						var reg, i;
						
						if (o.isTrue(useReg)) {
							reg = searchs;
						} else {
							if (o.isNotArray(searchs)) {
								searchs = [searchs];
							}
							
							if (o.isArray(searchs)) {
								o.map(searchs, function (v) {
									return HHString(v).quoteReg();
								});
							}
							
							var option = o.isTrue(once) ? '' : 'g';
							option += o.isTrue(ignoreCase) ? 'i' : '';
							reg = new RegExp("(" + searchs.join(')|(') + ")", option);
						}
						
						return str.replace(reg, replace);
					}
					
					/**
					 * 正则字符转义
					 * @returns {XML|void|string}
					 * @private
					 */
					function _quoteReg(str) {
						return str.replace(/([\\/|?.!()\[\]:+*^$])/g, '\\$1');
					}
					
					function _br2nl(str) {
						return o.strReplace(['<br/>', '<br>'], "\n", str);
					}
					
					function _nl2br(str) {
						return o.strReplace(["\r\n", "\n\r", "\r", "\n"], '<br/>', str);
					}
					
					/**
					 * 将字符串以指定的字符填充到指定长度
					 * @param str
					 * @param char
					 * @param tolength 正数在左侧填充, 负数在右侧填充
					 * @returns {*}
					 * @private
					 */
					function _strPad(str, char, tolength) {
						char = String(char);
						var padLength;
						
						if (tolength > 0) {
							padLength = tolength - str.length;
							padLength = padLength < 0 ? 0 : padLength;
							return String(char).puRepeat(padLength) + str;
						} else {
							padLength = (-tolength) - str.length;
							padLength = padLength < 0 ? 0 : padLength;
							return str + String(char).puRepeat(padLength);
						}
					}
					
					function _strLPad(str, char, tolength) {
						return _strPad(str, char, tolength)
					}
					
					function _strRPad(str, char, tolength) {
						return _strPad(str, char, -tolength)
					}
					
					/**
					 * 重复字符串
					 * @param str
					 * @param count
					 * @returns {*}
					 * @private
					 */
					function _strRepeat(str, count) {
						if (String.prototype.repeat) {
							return String.prototype.repeat.call(str, count);
						}
						
						var repeat = '';
						
						for (var i = 0; i < count; i++) {
							repeat += str;
						}
						
						return repeat;
					}
					
					function _trim(str, chars) {
						if (_isNotString(str)) {
							return str;
						}
						return str.puTrim(chars);
					}
					
					function _ltrim(str, chars) {
						if (_isNotString(str)) {
							return str;
						}
						return str.puLTrim(chars);
					}
					
					function _rtrim(str, chars) {
						if (_isNotString(str)) {
							return str;
						}
						return str.puRTrim(chars);
					}
					
					function _strReverse(str) {
						return str.split("").reverse().join("");
					}
					
					function _inRange(num, min, max) {
						return num >= min && num <= max;
					}
					
					function _outRange(num, min, max) {
						return !_inRange(num, min, max);
					}
					
					/**
					 * 进制转换
					 * @param num
					 * @param from
					 * @param to
					 * @returns {*}
					 * @private
					 */
					function _baseConvert(num, from, to) {
						num = parseInt(num, from);
						
						if (_outRange(from, 2, 36) || _outRange(to, 2, 36)) {
							console && console.error('Argument value out of range when calling $this$.baseConvert(...). The second and third argument must be between 2 and 36');
							return '0';
						}
						
						if (isNaN(num)) {
							return '0';
						}
						
						return num.toString(to);
					}
					
					/**
					 * 生成随机字符串
					 * @param length
					 * @returns {string}
					 * @private
					 */
					function _randString(length) {
						length = _if(o.isFalse(length), 16, length);
						var str = '';
						var template = 'abcdefghijklmnopqrstuvwxyz' +
							'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
							'1234567890';
						
						var tmpLength = template.length;
						
						for (var i = 0; i < length; i++) {
							str += template[_rand(0, tmpLength - 1)];
						}
						
						return str;
					}
					
					function _urlEncode(str) {
						str = encodeURIComponent(String(str));
						str = o.strReplace('%20', '+', str);
						str = o.strReplace('!', '%21', str);
						str = o.strReplace('(', '%28', str);
						str = o.strReplace(')', '%29', str);
						str = o.strReplace('*', '%2A', str);
						str = o.strReplace("'", '%27', str);
						str = o.strReplace("~", '%7E', str);
						return str;
					}
					
					function _urlDecode(str) {
						str = decodeURIComponent(String(str));
						str = o.strReplace('+', '%20', str);
						return str;
					}
					
					function _md5(string) {
						function rotateLeft(lValue, iShiftBits) {
							return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
						}
						
						function addUnsigned(lX, lY) {
							var lX4, lY4, lX8, lY8, lResult;
							lX8 = (lX & 0x80000000);
							lY8 = (lY & 0x80000000);
							lX4 = (lX & 0x40000000);
							lY4 = (lY & 0x40000000);
							lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
							if (lX4 & lY4) {
								return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
							}
							if (lX4 | lY4) {
								if (lResult & 0x40000000) {
									return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
								} else {
									return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
								}
							} else {
								return (lResult ^ lX8 ^ lY8);
							}
						}
						
						function _F(x, y, z) {
							return (x & y) | ((~x) & z);
						}
						
						function _G(x, y, z) {
							return (x & z) | (y & (~z));
						}
						
						function _H(x, y, z) {
							return (x ^ y ^ z);
						}
						
						function _I(x, y, z) {
							return (y ^ (x | (~z)));
						}
						
						function FF(a, b, c, d, x, s, ac) {
							a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
							return addUnsigned(rotateLeft(a, s), b);
						}
						
						function GG(a, b, c, d, x, s, ac) {
							a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
							return addUnsigned(rotateLeft(a, s), b);
						}
						
						function HH(a, b, c, d, x, s, ac) {
							a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
							return addUnsigned(rotateLeft(a, s), b);
						}
						
						function II(a, b, c, d, x, s, ac) {
							a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
							return addUnsigned(rotateLeft(a, s), b);
						}
						
						function convertToWordArray(string) {
							var lWordCount;
							var lMessageLength = string.length;
							var lNumberOfWords_temp1 = lMessageLength + 8;
							var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
							var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
							var lWordArray = new Array(lNumberOfWords - 1);
							var lBytePosition = 0;
							var lByteCount = 0;
							while (lByteCount < lMessageLength) {
								lWordCount = (lByteCount - (lByteCount % 4)) / 4;
								lBytePosition = (lByteCount % 4) * 8;
								lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
								lByteCount++;
							}
							lWordCount = (lByteCount - (lByteCount % 4)) / 4;
							lBytePosition = (lByteCount % 4) * 8;
							lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
							lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
							lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
							return lWordArray;
						}
						
						function wordToHex(lValue) {
							var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
							for (lCount = 0; lCount <= 3; lCount++) {
								lByte = (lValue >>> (lCount * 8)) & 255;
								WordToHexValue_temp = "0" + lByte.toString(16);
								WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
							}
							return WordToHexValue;
						}
						
						function utf8Encode(string) {
							string = string.replace(/\r\n/g, "\n");
							var utftext = "";
							
							for (var n = 0; n < string.length; n++) {
								
								var c = string.charCodeAt(n);
								
								if (c < 128) {
									utftext += String.fromCharCode(c);
								}
								else if ((c > 127) && (c < 2048)) {
									utftext += String.fromCharCode((c >> 6) | 192);
									utftext += String.fromCharCode((c & 63) | 128);
								}
								else {
									utftext += String.fromCharCode((c >> 12) | 224);
									utftext += String.fromCharCode(((c >> 6) & 63) | 128);
									utftext += String.fromCharCode((c & 63) | 128);
								}
								
							}
							
							return utftext;
						}
						
						var k, AA, BB, CC, DD, a, b, c, d;
						var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
						var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
						var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
						var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
						
						string = utf8Encode(string);
						
						var x = convertToWordArray(string);
						
						a = 0x67452301;
						b = 0xEFCDAB89;
						c = 0x98BADCFE;
						d = 0x10325476;
						
						for (k = 0; k < x.length; k += 16) {
							AA = a;
							BB = b;
							CC = c;
							DD = d;
							a = FF(a, b, c, d, x[k], S11, 0xD76AA478);
							d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
							c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
							b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
							a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
							d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
							c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
							b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
							a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
							d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
							c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
							b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
							a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
							d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
							c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
							b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
							a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
							d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
							c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
							b = GG(b, c, d, a, x[k], S24, 0xE9B6C7AA);
							a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
							d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
							c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
							b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
							a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
							d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
							c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
							b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
							a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
							d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
							c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
							b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
							a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
							d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
							c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
							b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
							a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
							d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
							c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
							b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
							a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
							d = HH(d, a, b, c, x[k], S32, 0xEAA127FA);
							c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
							b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
							a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
							d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
							c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
							b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
							a = II(a, b, c, d, x[k], S41, 0xF4292244);
							d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
							c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
							b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
							a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
							d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
							c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
							b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
							a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
							d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
							c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
							b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
							a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
							d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
							c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
							b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
							a = addUnsigned(a, AA);
							b = addUnsigned(b, BB);
							c = addUnsigned(c, CC);
							d = addUnsigned(d, DD);
						}
						
						return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
					}
					
					/* md5 */
					
					function _sha1(str) {
						var hexcase = 0;
						/* hex output format. 0 - lowercase; 1 - uppercase */
						var chrsz = 8;
						/* bits per input character. 8 - ASCII; 16 - Unicode */
						return hex_sha1(utf8Encode(str));
						
						/*
						 *
						 * The main function to calculate message digest
						 *
						 */
						function hex_sha1(s) {
							return binb2hex(core_sha1(AlignSHA1(s)));
						}
						
						function utf8Encode(string) {
							string = string.replace(/\r\n/g, "\n");
							var utftext = "";
							
							for (var n = 0; n < string.length; n++) {
								
								var c = string.charCodeAt(n);
								
								if (c < 128) {
									utftext += String.fromCharCode(c);
								}
								else if ((c > 127) && (c < 2048)) {
									utftext += String.fromCharCode((c >> 6) | 192);
									utftext += String.fromCharCode((c & 63) | 128);
								}
								else {
									utftext += String.fromCharCode((c >> 12) | 224);
									utftext += String.fromCharCode(((c >> 6) & 63) | 128);
									utftext += String.fromCharCode((c & 63) | 128);
								}
								
							}
							
							return utftext;
						}
						
						/**
						 * Calculate the SHA-1 of an array of big-endian words, and a bit length
						 */
						function core_sha1(blockArray) {
							var x = blockArray; // append padding
							var w = new Array(80);
							var a = 1732584193;
							var b = -271733879;
							var c = -1732584194;
							var d = 271733878;
							var e = -1009589776;
							
							for (var i = 0; i < x.length; i += 16) // 每次处理512位 16*32
							{
								var olda = a;
								var oldb = b;
								var oldc = c;
								var oldd = d;
								var olde = e;
								
								for (var j = 0; j < 80; j++) // 对每个512位进行80步操作
								{
									if (j < 16)
										w[j] = x[i + j];
									else
										w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
									
									var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
									e = d;
									d = c;
									c = rol(b, 30);
									b = a;
									a = t;
								}
								
								a = safe_add(a, olda);
								b = safe_add(b, oldb);
								c = safe_add(c, oldc);
								d = safe_add(d, oldd);
								e = safe_add(e, olde);
							}
							
							return [a, b, c, d, e];
						}
						
						/*
						 *
						 * Perform the appropriate triplet combination function for the current
						 * iteration
						 *
						 * 返回对应F函数的值
						 *
						 */
						function sha1_ft(t, b, c, d) {
							if (t < 20)
								return (b & c) | ((~b) & d);
							if (t < 40)
								return b ^ c ^ d;
							if (t < 60)
								return (b & c) | (b & d) | (c & d);
							return b ^ c ^ d; // t<80
						}
						
						/*
						 *
						 * Determine the appropriate additive constant for the current iteration
						 *
						 * 返回对应的Kt值
						 *
						 */
						function sha1_kt(t) {
							return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
						}
						
						/*
						 *
						 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
						 *
						 * to work around bugs in some JS interpreters.
						 *
						 * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
						 *
						 */
						function safe_add(x, y) {
							var lsw = (x & 0xFFFF) + (y & 0xFFFF);
							var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
							return (msw << 16) | (lsw & 0xFFFF);
						}
						
						/*
						 *
						 * Bitwise rotate a 32-bit number to the left.
						 *
						 * 32位二进制数循环左移
						 *
						 */
						function rol(num, cnt) {
							return (num << cnt) | (num >>> (32 - cnt));
						}
						
						/*
						 *
						 * The standard SHA1 needs the input string to fit into a block
						 *
						 * This function align the input string to meet the requirement
						 *
						 */
						function AlignSHA1(str) {
							var nblk = ((str.length + 8) >> 6) + 1,
								blks = new Array(nblk * 16);
							
							for (var i = 0; i < nblk * 16; i++)
								blks[i] = 0;
							
							for (i = 0; i < str.length; i++)
								blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);
							
							blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
							blks[nblk * 16 - 1] = str.length * 8;
							
							return blks;
						}
						
						/*
						 *
						 * Convert an array of big-endian words to a hex string.
						 *
						 */
						function binb2hex(binarray) {
							var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
							var str = "";
							
							for (var i = 0; i < binarray.length * 4; i++) {
								str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
									hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
							}
							
							return str;
						}
					}
					
					/* sha1 */
					
					function _base64Encode(str) {
						var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
						var output = "";
						var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
						var i = 0;
						str = _utf8_encode(str);
						while (i < str.length) {
							chr1 = str.charCodeAt(i++);
							chr2 = str.charCodeAt(i++);
							chr3 = str.charCodeAt(i++);
							enc1 = chr1 >> 2;
							enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
							enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
							enc4 = chr3 & 63;
							if (isNaN(chr2)) {
								enc3 = enc4 = 64;
							} else if (isNaN(chr3)) {
								enc4 = 64;
							}
							output = output +
								_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
								_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
						}
						return output;
						
						function _utf8_encode(string) {
							string = string.replace(/\r\n/g, "\n");
							var utftext = "";
							for (var n = 0; n < string.length; n++) {
								var c = string.charCodeAt(n);
								if (c < 128) {
									utftext += String.fromCharCode(c);
								} else if ((c > 127) && (c < 2048)) {
									utftext += String.fromCharCode((c >> 6) | 192);
									utftext += String.fromCharCode((c & 63) | 128);
								} else {
									utftext += String.fromCharCode((c >> 12) | 224);
									utftext += String.fromCharCode(((c >> 6) & 63) | 128);
									utftext += String.fromCharCode((c & 63) | 128);
								}
							}
							return utftext;
						}
					}
					
					function _base64Decode(str) {
						var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
						var output = "";
						var chr1, chr2, chr3;
						var enc1, enc2, enc3, enc4;
						var i = 0;
						str = str.replace(/[^A-Za-z0-9+\/=]/g, "");
						while (i < str.length) {
							enc1 = _keyStr.indexOf(str.charAt(i++));
							enc2 = _keyStr.indexOf(str.charAt(i++));
							enc3 = _keyStr.indexOf(str.charAt(i++));
							enc4 = _keyStr.indexOf(str.charAt(i++));
							chr1 = (enc1 << 2) | (enc2 >> 4);
							chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
							chr3 = ((enc3 & 3) << 6) | enc4;
							output = output + String.fromCharCode(chr1);
							if (enc3 != 64) {
								output = output + String.fromCharCode(chr2);
							}
							if (enc4 != 64) {
								output = output + String.fromCharCode(chr3);
							}
						}
						output = _utf8_decode(output);
						return output;
						
						function _utf8_decode(utftext) {
							var string = "";
							var i = 0;
							var c, c2, c3;
							
							while (i < utftext.length) {
								c = utftext.charCodeAt(i);
								if (c < 128) {
									string += String.fromCharCode(c);
									i++;
								} else if ((c > 191) && (c < 224)) {
									c2 = utftext.charCodeAt(i + 1);
									string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
									i += 2;
								} else {
									c2 = utftext.charCodeAt(i + 1);
									c3 = utftext.charCodeAt(i + 2);
									string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
									i += 3;
								}
							}
							return string;
						}
					}
					
					function _uniqid() {
						return o.randString(24).toUpperCase();
					}
					
					return {
						'if': _if,
						iffalse: _iffalse,
						iftrue: _iftrue,
						ifudf: _ifudf,
						isString: _isString,
						isArray: _isArray,
						isSimpleObject: _isSimpleObject,
						isNumber: _isNumber,
						isDate: _isDate,
						isFalse: _isFalse,
						isRegExp: _isRegExp,
						isTrue: _isTrue,
						isEmpty: _isEmpty,
						isBool: _isBool,
						isHTMLElement: _isHTMLElement,
						isUndefined: _isUndefined,
						isFunction: _isFunction,
						
						isNotString: _isNotString,
						isNotArray: _isNotArray,
						isNotSimpleObject: _isNotSimpleObject,
						isNotNumber: _isNotNumber,
						isNotDate: _isNotDate,
						isNotFalse: _isNotFalse,
						isNotRegExp: _isNotRegExp,
						isNotTrue: _isNotTrue,
						isNotEmpty: _isNotEmpty,
						isNotBool: _isNotBool,
						isNotHTMLElement: _isNotHTMLElement,
						isNotUndefined: _isNotUndefined,
						isNotFunction: _isNotFunction,
						
						merge: _merge,
						clone: _clone,
						foreach: _foreach,
						each: _foreach,
						map: _map,
						
						outRange: _outRange,
						inRange: _inRange,
						baseConvert: _baseConvert,
						
						rand: _rand,
						srand: _srand,
						
						encodeUrl: _urlEncode,
						decodeUrl: _urlDecode,
						jsonEncode: _jsonEncode,
						jsonDecode: _jsonDecode,
						
						randString: _randString,
						chop: _trim,
						trim: _trim,
						ltrim: _ltrim,
						rtrim: _rtrim,
						quoteReg: _quoteReg,
						strRepeat: _strRepeat,
						strReplace: _strReplace,
						strIReplace: _strIReplace,
						pregReplace: _pregReplace,
						nl2br: _nl2br,
						br2nl: _br2nl,
						strLPad: _strLPad,
						strRPad: _strRPad,
						strPad: _strPad,
						strReverse: _strReverse,
						md5: _md5,
						sha1: _sha1,
						base64Encode: _base64Encode,
						base64Decode: _base64Decode,
						uniqid: _uniqid,
					};
				})())
			}();
		};
	})();
	
	w.HH.getObjectUrl = function (obj) {
		var url = null;
		if (window.createObjectURL != undefined) {
			url = window.createObjectURL(obj);
		} else if (window.URL != undefined) {
			url = window.URL.createObjectURL(obj);
		} else if (window.webkitURL != undefined) {
			url = window.webkitURL.createObjectURL(obj);
		}
		return url
	};
	
	/**
	 * 字符串封装
	 * @param str
	 * @constructor
	 */
	w.HHString = (function () {
		return function (str) {
			if (this === w || typeof this == 'undefined') {
				return new arguments.callee(str);
			}
			
			~function () {
				var _text = String(str);
				
				/**
				 * HHString('Hello {0}, {1}').format('World', 'This is a test')
				 * @returns {void | string | *}
				 */
				this.format = function () {
					var args = arguments;
					return HHString(_text.replace(/{(\d+)}/g, function (match, number) {
						return typeof args[number] != 'undefined'
							? args[number]
							: match
							;
					}));
				};
				
				/**
				 * encode url
				 * @returns {arguments.callee|void}
				 */
				this.encodeUrl = function () {
					return HHString(HH.encodeUrl(_text));
				};
				
				/**
				 * decodeUrl
				 * @returns {arguments.callee|void}
				 */
				this.decodeUrl = function () {
					return HHString(HH.decodeUrl(_text));
				};
				
				this.toString = function () {
					return String(_text);
				};
				
				this.toNumber = function () {
					return Number(_text);
				}
			}.call(this);
		};
	})();
	
	~function (o) {
		o.rand = function (length) {
			return HH.randString(length);
		}
	}(HHString);
	
	function _urlEncode(str) {
		return encodeURIComponent(String(str)).replace(/%20/g, '+')
			.replace(/!/g, '%21').replace(/\(/g, '%28')
			.replace(/\)/g, '%29').replace(/\*/g, '%2A')
			.replace(/'/g, '%27').replace(/~/g, '%7E');
	}
	
	function _urlDecode(str) {
		return decodeURIComponent(String(str).replace(/\+/g, '%20'));
	}
	
	/**
	 * 前端请求工具
	 * @param url
	 * @constructor
	 * @return HHRequestor
	 */
	w.HHRequestor = function(url) {
		if(this === w || typeof this == 'undefined') {
			return new arguments.callee(url);
		}
		
		this._url = url;
		this._options = [];
		this._successCallback = null;
		this._failCallback = null;
		this._beforeCallback = null;
		this._afterCallback = null;
		this._dataType = "json";
		this._contentType = 'application/x-www-form-urlencoded';
		this._params = null;
		
		var o = this;
		
		this.params = function(params) {
			this._params = params;
			return this;
		};
		
		this.options = function(options) {
			this._options = options;
			return this;
		};
		
		this.contentType = function(type) {
			this._contentType = type;
			return this;
		};
		
		this.before = function (callback) {
			this._beforeCallback = callback;
			return this;
		};
		
		this.dataType = function (type) {
			this._dataType = type;
			return this;
		};
		
		this.after = function (callback) {
			this._afterCallback = callback;
			return this;
		};
		
		this.success = function (callback) {
			this._successCallback = callback;
			return this;
		};
		
		this.fail = function (callback) {
			this._failCallback = callback;
			return this;
		};
		
		this.get = function (url, params) {
			this.send('get', url, params);
			return this;
		};
		
		this.post = function (url, params) {
			this.send('post', url, params);
			return this;
		};
		
		this.isRequestError = function() {
			return this._isRequestError;
		};
		
		this.send = function(method, url, params) {
			this._isRequestError = false;
			
			var options = $.extend({
				method: method,
				contentType: this._contentType,
				beforeSend:this._beforeCallback,
				complete:this._afterCallback,
				url:url ? url : this._url,
				data: params ? params : this._params,
				success: function(data) {
					o.result = data;
					
					if(o.result.success) {
						o._successCallback ? o._successCallback.apply(o):0;
					} else {
						o._failCallback ? o._failCallback.apply(o):0;
					}
				} ,
				error: function(jqXHR, textStatus, errorThrown) {
					var msg = "请求错误 ";
					
					if(jqXHR.readyState == 0) {
						msg = "网络错误";
					} else {
						msg += jqXHR.status + ' ' + errorThrown;
					}
					
					o._isRequestError = true;
					o.result = {success:false, msg:msg, code:textStatus, frontend_error:true};
					o._failCallback ? o._failCallback.apply(o):0;
				},
				dataType: this._dataType
			}, this._options);
			
			$.ajax(options);
			return this;
		};
	};
	
	/**
	 * 倒计时工具
	 */
	w.HHCountdown =  function(duration) {
		if(this === w || typeof this == 'undefined') {
			return new arguments.callee(duration);
		}
		
		this.timer = null;
		this.duration = duration;
		this.progressCallable = null;
		this.completedCallable = null;
		var o = this;
		
		~function () {
			var _remainingSecond=duration;
			
			o.restart = function () {
				_remainingSecond = o.duration;
				o.start();
			};
			
			o.progress = function (callable) {
				o.progressCallable = callable;
				return o;
			};
			
			o.remaining = function(seconds) {
				_remainingSecond = seconds;
				return o;
			};
			
			o.completed = function(calllable) {
				o.completedCallable = calllable;
				return o;
			};
			
			o.pause = function () {
				clearInterval(o.timer);
				o.timer = null;
				return o;
			};
			
			o.start = function() {
				if(o.timer) {
					return o;
				}
				
				if(_remainingSecond <= 0) {
					o.stop();
					o.completedCallable ? o.completedCallable.apply(o) : 0;
					return o;
				}
				
				o.progressCallable ? o.progressCallable.apply(o, [_remainingSecond]) : 0;
				o.timer = setInterval(function () {
					_remainingSecond --;
					
					if(_remainingSecond <= 0) {
						o.stop();
						o.completedCallable ? o.completedCallable.apply(o) : 0;
						return ;
					}
					
					o.progressCallable ? o.progressCallable.apply(o, [_remainingSecond]) : 0;
				}, 1000);
				
				return o;
			};
			
			o.stop = function () {
				if(o.timer) {
					o.pause();
					_remainingSecond = 0;
				}
				
				return o;
			};
		}();
	};
	
	/**
	 * url 解析和构建工具
	 * @returns {w.HHUrl}
	 * @constructor
	 */
	w.HHUrl = function (url) {
		if(this === w || typeof this == 'undefined') {
			return new arguments.callee(url);
		}
		
		this.ongo = null;
		
		var o = this;
		
		~function () {
			var _attributes;
			
			o.getParam = function(key, separator) {
				if(typeof key == 'undefined') {
					return _attributes.params;
				}
				
				separator = !separator && separator !== 0 ? null : separator;
				
				var value = _attributes.params[key];
				value = typeof value == 'undefined' ? null : value;
				
				if(separator) {
					return !value && value!==0 ? [] : value.split(separator);
				} else {
					return value;
				}
			};
			
			o.getAttributes = function () {
				return _attributes;
			};
			
			o.getAttribute = function(key) {
				return _attributes[key];
			};
			
			o.setAttribute = function (key, value) {
				_attributes[key] = value;
				return o;
			};
			
			o.setPath = function (value) {
				value = value.substr(0) == '/' ? '' : '/' + value;
				o.setAttribute('path', value);
				return o;
			};
			
			o.setPort = function (value) {
				o.setAttribute('port', value);
				return o;
			};
			
			o.setHost = function (value) {
				o.setAttribute('host', value);
				return o;
			};
			
			o.setScheme = function (value) {
				o.setAttribute('scheme', value);
				return o;
			};
			
			o.toString = o.str = o.getUrl = function () {
				var url = _attributes.scheme +
					(_attributes.scheme ? '://' : '') +
					_attributes.host;
				
				if(_attributes.host) {
					url += ((_attributes.port == '80' || _attributes.port == '') ? '' : ':' + _attributes.port);
				}
				
				url += _attributes.path +
					o.getQueryBody();
				
				return url;
			};
			
			o.go = function() {
				window.location.href = o.str();
				
				if(o.ongo) {
					o.ongo();
				}
				
				return o;
			};
			
			o.setUrl = function (url) {
				url = typeof url == 'undefined' ? '' : url;
				_attributes = parseUrl(url);
				return o;
			};
			
			o.addParam = function(key, value) {
				if(HH.isArray(_attributes.params[key])) {
					_attributes.params[key].push(value);
				} else if(_attributes.params[key] || _attributes.params[key] ===0 ){
					_attributes.params[key] = [_attributes.params[key], value];
				} else {
					_attributes.params[key] = value;
				}
				return o;
			};
			
			o.setParam = o.updateParam = function(key, value) {
				_attributes.params[key] = value;
				return o;
			};
			
			o.deleteParam = o.clearParam = function (key) {
				delete _attributes.params[key];
				return o;
			};
			
			o.getQueryBody = function () {
				var str = '';
				var params = _attributes.params;
				
				for(var k in params) {
					var paramValue = _urlEncode(params[k]);
					var paramName = _urlEncode(k);
					if(HH.isArray(paramValue)) {
						for(var i=0; i<paramValue.length; i++) {
							str += '&' + paramName + '=' + paramValue[i];
						}
					} else {
						str += '&' + paramName + '=' + paramValue;
					}
				}
				
				if(str == '') {
					return '';
				}
				
				return '?' + str.substr(1);
			};
			
			function parseQueryString(query) {
				var paramsSegmentAry = query.split('&');
				var params = {};
				
				for(var i=0; i<paramsSegmentAry.length; i++) {
					if(paramsSegmentAry[0] == '') {
						continue;
					}
					
					var eqPos = paramsSegmentAry[i].indexOf('=');
					var key = eqPos < 0 ? paramsSegmentAry[i] : paramsSegmentAry[i].substr(0, eqPos);
					key = _urlDecode(key);
					var value = eqPos < 0 ? '' : paramsSegmentAry[i].substr(eqPos+1);
					value = _urlDecode(value);
					params[key] = value;
				}
				
				return params;
			}
			
			function parseUrl(url) {
				var qmPos = url.indexOf('?');
				var baseUrl = qmPos<0 ? url : url.substr(0, qmPos);
				baseUrl = baseUrl.replace(/\\/g, '/');
				var matchs = baseUrl.match(/(?:(.*):\/\/+)?(.*)/);
				var head = matchs[1] ? matchs[1] : '';
				var pathinfo = matchs[2] ? matchs[2] : '';
				pathinfo = pathinfo.replace(/\/+/g, '/');
				var headSplit = head.split(':');
				var pathinfoSplit = pathinfo.split('/');
				var host = pathinfoSplit[0];
				pathinfoSplit.splice(0, 1);
				
				var attributes = {
					scheme: headSplit[0],
					port: headSplit[1] ? headSplit[1] : '80',
					host: host,
					path: '/' + pathinfoSplit.join('/')
				};
				
				attributes.queryBody = qmPos<0 ? '' : url.substr(qmPos);
				attributes.query = attributes.queryBody.substr(1);
				attributes.params = parseQueryString(attributes.query);
				
				return attributes;
			}
		}();
		
		url = HH.isUndefined(url) ? w.location.href : url;
		o.setUrl(url);
	};
	
	HHUrl.encode = function (str) {
		return HH.encodeUrl(str);
	};
	
	HHUrl.decode = function (str) {
		return HH.decodeUrl(str);
	};
	
	
	w.HHPoint = function(x, y) {
		if(this === w || typeof this == 'undefined') {
			return new arguments.callee(x, y);
		}
		
		if(HH.isUndefined(x) || HH.isFalse(x)) {
			x = 0;
		}
		
		if(isNaN(parseFloat(x))) {
			console.warn('HHPoint 的x参数为非数字: ' + x);
			x = 0;
		}
		
		if(HH.isUndefined(y) || HH.isFalse(y)) {
			y = 0;
		}
		
		if(isNaN(parseFloat(y))) {
			console.warn('HHPoint 的y参数为非数字: ' + y);
			y = 0;
		}
		
		this.x = x;
		this.y = y;
	};
	
	$.fn.hhLocateById = function() {
		var id = $(this).eq(0).attr('id');
		
		if(id) {
			window.location.hash = null;
			window.location.hash = id;
		}
	};
	
	$.fn.hhLocate = function (offset) {
		$("html").stop().animate({
			scrollTop: $(this).offset().top + (offset ? offset : 0)
		}, 400);
	};
	
	
	$.fn.hhdragging = (function (callback, options) {
		var defaultOptions = {
		
		};
		
		window._instances = {};
		var _dragging = null;
		var _lastPagePoint = null;
		var _lastClientPoint = null;
		var _lastScreenPoint = null;
		
		$(window).on('mousemove', function (e) {
			if(!_dragging) {
				return ;
			}
			
			var pageDiff = HHPoint(e.pageX-_lastPagePoint.x, e.pageY-_lastPagePoint.y);
			var screenDiff = HHPoint(e.screenX-_lastScreenPoint.x, e.screenY-_lastScreenPoint.y);
			var clientDiff = HHPoint(e.clientX-_lastClientPoint.x, e.clientY-_lastClientPoint.y);
			
			_lastPagePoint = HHPoint(e.pageX, e.pageY);
			_lastClientPoint = HHPoint(e.clientX, e.clientY);
			_lastScreenPoint = HHPoint(e.screenX, e.screenY);
			
			_dragging.triggerDragging(_dragging.getElement(), [{
				page: HHPoint(e.pageX, e.pageY),
				screen: HHPoint(e.screenX, e.screenY),
				client: HHPoint(e.clientX, e.clientY),
				
				pageDiff: pageDiff,
				screenDiff: screenDiff,
				clientDiff: clientDiff
			}, e, _dragging]);
			
		}).on('mouseup', function (e) {
			if(_dragging) {
				_dragging.triggerAfterDrag(_dragging.getElement(), [e, _dragging]);
			}
			
			_dragging = null;
		});
		
		return function (callback) {
			$(this).each(function () {
				var calcOption = $.extend({}, defaultOptions, options);
				var elm = $(this)[0];
				var instance = null;
				
				if(elm._hhdragging_id && _instances[elm._hhdragging_id]) {
					instance = _instances[elm._hhdragging_id];
					
					if(HH.isFunction(callback)) {
						instance.onDragging(callback);
					}
				} else {
					new function _HHDragging () {
						this._dragCallbacks = [];
						this._beginDragCallbacks = [];
						this._afterDragCallbacks = [];
						this._destoryCallbacks = [];
						this._element = elm;
						
						var ins = this;
						elm._hhdragging_id = HHString.rand(12);
						this._id = elm._hhdragging_id;
						
						_instances[elm._hhdragging_id] = ins;
						
						if(HH.isFunction(callback)) {
							this._dragCallbacks.push(callback);
						}
						
						this.getElement = function () {
							return this._element;
						};
						
						this.onDragging = function (callback) {
							this._dragCallbacks.push(callback);
							return this;
						};
						
						this.onBeforeDrag = function (callback) {
							this._beginDragCallbacks.push(callback);
							return this;
						};
						
						this.onAfterDrag = function (callback) {
							this._afterDragCallbacks.push(callback);
							return this;
						};
						
						this.onDestory = function (callback) {
							this._destoryCallbacks.push(callback);
							return this;
						};
						
						this.triggerDragging = function(th, params) {
							for(var i=0; i<this._dragCallbacks.length; i++) {
								this._dragCallbacks[i].apply(th, params);
							}
						};
						
						this.triggerBeforeDrag = function(th, params) {
							for(var i=0; i<this._beginDragCallbacks.length; i++) {
								this._beginDragCallbacks[i].apply(th, params);
							}
						};
						
						this.triggerAfterDrag = function(th, params) {
							for(var i=0; i<this._afterDragCallbacks.length; i++) {
								this._afterDragCallbacks[i].apply(th, params);
							}
						};
						
						this.triggerDestory = function(th, params) {
							for(var i=0; i<this._destoryCallbacks.length; i++) {
								this._destoryCallbacks[i].apply(th, params);
							}
						};
						
						this.destory = function () {
							this.triggerDestory(this);
							delete _instances[elm._hhdragging_id];
							delete elm._hhdragging_id;
							$(this._element).off('mouseup.hhdragging').off('mousedown.hhdragging');
						};
						
						$(this._element).on('mousedown.hhdragging', function (e) {
							_dragging = ins;
							_lastPagePoint = HHPoint(e.pageX, e.pageY);
							_lastClientPoint = HHPoint(e.clientX, e.clientY);
							_lastScreenPoint = HHPoint(e.screenX, e.screenY);
							_dragging.triggerBeforeDrag(this, [e, _dragging]);
						});
					};
				}
			});
			
			var first = $(this)[0];
			return first._hhdragging_id ? _instances[first._hhdragging_id] : null;
		}
	}());
	
	$.fn.hhdraggingBefore = function(callback) {
		$(this).each(function () {
			let dragging = $(this).hhdragging();
			dragging.onBeforeDrag(callback);
		});
	};
	
	$.fn.hhdraggingAfter = function(callback) {
		$(this).each(function () {
			let dragging = $(this).hhdragging();
			dragging.onAfterDrag(callback);
		});
	};
})(window);