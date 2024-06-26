/*
! function(t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("beautifier", [], e) : "object" == typeof exports ? exports.beautifier = e() : t.beautifier = e()
}(
"undefined" != typeof self ? self : "undefined" != typeof windows ? window : "undefined" != typeof global ? global : this,
*/
export const mod = function(){
let pretty = function() {
	return function(t) {
		var e = {};

		function i(n) {
			if (e[n]) return e[n].exports;
			var s = e[n] = {
				i: n,
				l: !1,
				exports: {}
			};
			return t[n].call(s.exports, s, s.exports, i), s.l = !0, s.exports
		}
		return i.m = t, i.c = e, i.d = function(t, e, n) {
			i.o(t, e) || Object.defineProperty(t, e, {
				enumerable: !0,
				get: n
			})
		}, i.r = function(t) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
				value: "Module"
			}), Object.defineProperty(t, "__esModule", {
				value: !0
			})
		}, i.t = function(t, e) {
			if (1 & e && (t = i(t)), 8 & e) return t;
			if (4 & e && "object" == typeof t && t && t.__esModule) return t;
			var n = Object.create(null);
			if (i.r(n), Object.defineProperty(n, "default", {
					enumerable: !0,
					value: t
				}), 2 & e && "string" != typeof t)
				for (var s in t) i.d(n, s, function(e) {
					return t[e]
				}.bind(null, s));
			return n
		}, i.n = function(t) {
			var e = t && t.__esModule ? function() {
				return t.default
			} : function() {
				return t
			};
			return i.d(e, "a", e), e
		}, i.o = function(t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		}, i.p = "", i(i.s = 9)
	}([function(t, e, i) {
		"use strict";
		var n = i(4).InputScanner,
			s = i(1).Tokenizer,
			_ = i(1).TOKEN,
			o = i(7).Directives,
			r = i(6);

		function a(t, e) {
			return -1 !== e.indexOf(t)
		}
		var h = {
				START_EXPR: "TK_START_EXPR",
				END_EXPR: "TK_END_EXPR",
				START_BLOCK: "TK_START_BLOCK",
				END_BLOCK: "TK_END_BLOCK",
				WORD: "TK_WORD",
				RESERVED: "TK_RESERVED",
				SEMICOLON: "TK_SEMICOLON",
				STRING: "TK_STRING",
				EQUALS: "TK_EQUALS",
				OPERATOR: "TK_OPERATOR",
				COMMA: "TK_COMMA",
				BLOCK_COMMENT: "TK_BLOCK_COMMENT",
				COMMENT: "TK_COMMENT",
				DOT: "TK_DOT",
				UNKNOWN: "TK_UNKNOWN",
				START: _.START,
				RAW: _.RAW,
				EOF: _.EOF
			},
			p = new o(/\/\*/, /\*\//),
			l = /0[xX][0123456789abcdefABCDEF]*|0[oO][01234567]*|0[bB][01]*|\d+n|(?:\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/g,
			u = /[0-9]/,
			c = /[^\d\.]/,
			f = ">>> === !== << && >= ** != == <= >> || < / - + > : & % ? ^ | *".split(" "),
			d = ">>>= ... >>= <<= === >>> !== **= => ^= :: /= << <= == && -= >= >> != -- += ** || ++ %= &= *= |= = ! ? > < : / ^ - + * & % ~ |";
		d = (d = d.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&")).replace(/ /g, "|");
		var g, k = new RegExp(d, "g"),
			m = /#![^\n\r\u2028\u2029]*(?:\r\n|[\n\r\u2028\u2029])?/g,
			y = /#include[^\n\r\u2028\u2029]*(?:\r\n|[\n\r\u2028\u2029])?/g,
			w = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","),
			x = w.concat(["do", "in", "of", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await", "from", "as"]),
			v = new RegExp("^(?:" + x.join("|") + ")$"),
			b = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,
			E = /\/\/(?:[^\n\r\u2028\u2029]*)/g,
			O = /(?:(?:<\?php|<\?=)[\s\S]*?\?>)|(?:<%[\s\S]*?%>)/g,
			T = function(t, e) {
				s.call(this, t, e), this._whitespace_pattern = /[\n\r\u2028\u2029\t\u000B\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff ]+/g, this._newline_pattern = /([^\n\r\u2028\u2029]*)(\r\n|[\n\r\u2028\u2029])?/g
			};
		(T.prototype = new s)._is_comment = function(t) {
			return t.type === h.COMMENT || t.type === h.BLOCK_COMMENT || t.type === h.UNKNOWN
		}, T.prototype._is_opening = function(t) {
			return t.type === h.START_BLOCK || t.type === h.START_EXPR
		}, T.prototype._is_closing = function(t, e) {
			return (t.type === h.END_BLOCK || t.type === h.END_EXPR) && e && ("]" === t.text && "[" === e.text || ")" === t.text && "(" === e.text || "}" === t.text && "{" === e.text)
		}, T.prototype._reset = function() {
			g = !1
		}, T.prototype._get_next_token = function(t, e) {
			this._readWhitespace();
			var i = null,
				n = this._input.peek();
			return i = (i = (i = (i = (i = (i = (i = (i = (i = i || this._read_singles(n)) || this._read_word(t)) || this._read_comment(n)) || this._read_string(n)) || this._read_regexp(n, t)) || this._read_xml(n, t)) || this._read_non_javascript(n)) || this._read_punctuation()) || this._create_token(h.UNKNOWN, this._input.next())
		}, T.prototype._read_word = function(t) {
			var e;
			return "" !== (e = this._input.read(r.identifier)) ? t.type !== h.DOT && (t.type !== h.RESERVED || "set" !== t.text && "get" !== t.text) && v.test(e) ? "in" === e || "of" === e ? this._create_token(h.OPERATOR, e) : this._create_token(h.RESERVED, e) : this._create_token(h.WORD, e) : "" !== (e = this._input.read(l)) ? this._create_token(h.WORD, e) : void 0
		}, T.prototype._read_singles = function(t) {
			var e = null;
			return null === t ? e = this._create_token(h.EOF, "") : "(" === t || "[" === t ? e = this._create_token(h.START_EXPR, t) : ")" === t || "]" === t ? e = this._create_token(h.END_EXPR, t) : "{" === t ? e = this._create_token(h.START_BLOCK, t) : "}" === t ? e = this._create_token(h.END_BLOCK, t) : ";" === t ? e = this._create_token(h.SEMICOLON, t) : "." === t && c.test(this._input.peek(1)) ? e = this._create_token(h.DOT, t) : "," === t && (e = this._create_token(h.COMMA, t)), e && this._input.next(), e
		}, T.prototype._read_punctuation = function() {
			var t = this._input.read(k);
			if ("" !== t) return "=" === t ? this._create_token(h.EQUALS, t) : this._create_token(h.OPERATOR, t)
		}, T.prototype._read_non_javascript = function(t) {
			var e = "";
			if ("#" === t) {
				if (this._is_first_token() && (e = this._input.read(m))) return this._create_token(h.UNKNOWN, e.trim() + "\n");
				if (e = this._input.read(y)) return this._create_token(h.UNKNOWN, e.trim() + "\n");
				t = this._input.next();
				var i = "#";
				if (this._input.hasNext() && this._input.testChar(u)) {
					do {
						i += t = this._input.next()
					} while (this._input.hasNext() && "#" !== t && "=" !== t);
					return "#" === t || ("[" === this._input.peek() && "]" === this._input.peek(1) ? (i += "[]", this._input.next(), this._input.next()) : "{" === this._input.peek() && "}" === this._input.peek(1) && (i += "{}", this._input.next(), this._input.next())), this._create_token(h.WORD, i)
				}
				this._input.back()
			} else if ("<" === t) {
				if ("?" === this._input.peek(1) || "%" === this._input.peek(1)) {
					if (e = this._input.read(O)) return e = e.replace(r.allLineBreaks, "\n"), this._create_token(h.STRING, e)
				} else if (this._input.match(/<\!--/g)) {
					for (t = "\x3c!--"; this._input.hasNext() && !this._input.testChar(r.newline);) t += this._input.next();
					return g = !0, this._create_token(h.COMMENT, t)
				}
			} else if ("-" === t && g && this._input.match(/-->/g)) return g = !1, this._create_token(h.COMMENT, "--\x3e");
			return null
		}, T.prototype._read_comment = function(t) {
			var e = null;
			if ("/" === t) {
				var i = "";
				if ("*" === this._input.peek(1)) {
					i = this._input.read(b);
					var n = p.get_directives(i);
					n && "start" === n.ignore && (i += p.readIgnored(this._input)), i = i.replace(r.allLineBreaks, "\n"), (e = this._create_token(h.BLOCK_COMMENT, i)).directives = n
				} else "/" === this._input.peek(1) && (i = this._input.read(E), e = this._create_token(h.COMMENT, i))
			}
			return e
		}, T.prototype._read_string = function(t) {
			if ("`" === t || "'" === t || '"' === t) {
				var e = this._input.next();
				return this.has_char_escapes = !1, e += "`" === t ? this._read_string_recursive("`", !0, "${") : this._read_string_recursive(t), this.has_char_escapes && this._options.unescape_strings && (e = function(t) {
					var e = "",
						i = 0,
						s = new n(t),
						_ = null;
					for (; s.hasNext();)
						if ((_ = s.match(/([\s]|[^\\]|\\\\)+/g)) && (e += _[0]), "\\" === s.peek()) {
							if (s.next(), "x" === s.peek()) _ = s.match(/x([0-9A-Fa-f]{2})/g);
							else {
								if ("u" !== s.peek()) {
									e += "\\", s.hasNext() && (e += s.next());
									continue
								}
								_ = s.match(/u([0-9A-Fa-f]{4})/g)
							}
							if (!_) return t;
							if ((i = parseInt(_[1], 16)) > 126 && i <= 255 && 0 === _[0].indexOf("x")) return t;
							if (i >= 0 && i < 32) {
								e += "\\" + _[0];
								continue
							}
							e += 34 === i || 39 === i || 92 === i ? "\\" + String.fromCharCode(i) : String.fromCharCode(i)
						} return e
				}(e)), this._input.peek() === t && (e += this._input.next()), this._create_token(h.STRING, e)
			}
			return null
		}, T.prototype._allow_regexp_or_xml = function(t) {
			return t.type === h.RESERVED && a(t.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || t.type === h.END_EXPR && ")" === t.text && t.opened.previous.type === h.RESERVED && a(t.opened.previous.text, ["if", "while", "for"]) || a(t.type, [h.COMMENT, h.START_EXPR, h.START_BLOCK, h.START, h.END_BLOCK, h.OPERATOR, h.EQUALS, h.EOF, h.SEMICOLON, h.COMMA])
		}, T.prototype._read_regexp = function(t, e) {
			if ("/" === t && this._allow_regexp_or_xml(e)) {
				for (var i = this._input.next(), n = !1, s = !1; this._input.hasNext() && (n || s || this._input.peek() !== t) && !this._input.testChar(r.newline);) i += this._input.peek(), n ? n = !1 : (n = "\\" === this._input.peek(), "[" === this._input.peek() ? s = !0 : "]" === this._input.peek() && (s = !1)), this._input.next();
				return this._input.peek() === t && (i += this._input.next(), i += this._input.read(r.identifier)), this._create_token(h.STRING, i)
			}
			return null
		};
		var R = /<()([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g,
			S = /[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;
		T.prototype._read_xml = function(t, e) {
			if (this._options.e4x && "<" === t && this._input.test(R) && this._allow_regexp_or_xml(e)) {
				var i = "",
					n = this._input.match(R);
				if (n) {
					for (var s = n[2].replace(/^{\s+/, "{").replace(/\s+}$/, "}"), _ = 0 === s.indexOf("{"), o = 0; n;) {
						var a = !!n[1],
							p = n[2];
						if (!(!!n[n.length - 1] || "![CDATA[" === p.slice(0, 8)) && (p === s || _ && p.replace(/^{\s+/, "{").replace(/\s+}$/, "}")) && (a ? --o : ++o), i += n[0], o <= 0) break;
						n = this._input.match(S)
					}
					return n || (i += this._input.match(/[\s\S]*/g)[0]), i = i.replace(r.allLineBreaks, "\n"), this._create_token(h.STRING, i)
				}
			}
			return null
		}, T.prototype._read_string_recursive = function(t, e, i) {
			for (var n, s = "", _ = !1; this._input.hasNext() && (n = this._input.peek(), _ || n !== t && (e || !r.newline.test(n)));)(_ || e) && r.newline.test(n) ? ("\r" === n && "\n" === this._input.peek(1) && (this._input.next(), n = this._input.peek()), s += "\n") : s += n, _ ? ("x" !== n && "u" !== n || (this.has_char_escapes = !0), _ = !1) : _ = "\\" === n, this._input.next(), i && -1 !== s.indexOf(i, s.length - i.length) && (s += "`" === t ? this._read_string_recursive("}", e, "`") : this._read_string_recursive("`", e, "${"), this._input.hasNext() && (s += this._input.next()));
			return s
		}, t.exports.Tokenizer = T, t.exports.TOKEN = h, t.exports.positionable_operators = f.slice(), t.exports.line_starters = w.slice()
	}, function(t, e, i) {
		"use strict";
		var n = i(4).InputScanner,
			s = i(5).Token,
			_ = i(13).TokenStream,
			o = {
				START: "TK_START",
				RAW: "TK_RAW",
				EOF: "TK_EOF"
			},
			r = function(t, e) {
				this._input = new n(t), this._options = e || {}, this.__tokens = null, this.__newline_count = 0, this.__whitespace_before_token = "", this._whitespace_pattern = /[\n\r\t ]+/g, this._newline_pattern = /([^\n\r]*)(\r\n|[\n\r])?/g
			};
		r.prototype.tokenize = function() {
			var t;
			this._input.restart(), this.__tokens = new _, this._reset();
			for (var e = new s(o.START, ""), i = null, n = [], r = new _; e.type !== o.EOF;) {
				for (t = this._get_next_token(e, i); this._is_comment(t);) r.add(t), t = this._get_next_token(e, i);
				r.isEmpty() || (t.comments_before = r, r = new _), t.parent = i, this._is_opening(t) ? (n.push(i), i = t) : i && this._is_closing(t, i) && (t.opened = i, i.closed = t, i = n.pop(), t.parent = i), t.previous = e, e.next = t, this.__tokens.add(t), e = t
			}
			return this.__tokens
		}, r.prototype._is_first_token = function() {
			return this.__tokens.isEmpty()
		}, r.prototype._reset = function() {}, r.prototype._get_next_token = function(t, e) {
			this._readWhitespace();
			var i = this._input.read(/.+/g);
			return i ? this._create_token(o.RAW, i) : this._create_token(o.EOF, "")
		}, r.prototype._is_comment = function(t) {
			return !1
		}, r.prototype._is_opening = function(t) {
			return !1
		}, r.prototype._is_closing = function(t, e) {
			return !1
		}, r.prototype._create_token = function(t, e) {
			var i = new s(t, e, this.__newline_count, this.__whitespace_before_token);
			return this.__newline_count = 0, this.__whitespace_before_token = "", i
		}, r.prototype._readWhitespace = function() {
			var t = this._input.read(this._whitespace_pattern);
			if (" " === t) this.__whitespace_before_token = t;
			else if ("" !== t) {
				this._newline_pattern.lastIndex = 0;
				for (var e = this._newline_pattern.exec(t); e[2];) this.__newline_count += 1, e = this._newline_pattern.exec(t);
				this.__whitespace_before_token = e[1]
			}
		}, t.exports.Tokenizer = r, t.exports.TOKEN = o
	}, function(t, e, i) {
		"use strict";

		function n(t) {
			this.__parent = t, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__items = []
		}

		function s(t, e) {
			this.__cache = [t], this.__level_string = e
		}

		function _(t, e) {
			var i = t.indent_char;
			t.indent_size > 1 && (i = new Array(t.indent_size + 1).join(t.indent_char)), e = e || "", t.indent_level > 0 && (e = new Array(t.indent_level + 1).join(i)), this.__indent_cache = new s(e, i), this.__alignment_cache = new s("", " "), this.baseIndentLength = e.length, this.indent_length = i.length, this.raw = !1, this._end_with_newline = t.end_with_newline, this.__lines = [], this.previous_line = null, this.current_line = null, this.space_before_token = !1, this.__add_outputline()
		}
		n.prototype.item = function(t) {
			return t < 0 ? this.__items[this.__items.length + t] : this.__items[t]
		}, n.prototype.has_match = function(t) {
			for (var e = this.__items.length - 1; e >= 0; e--)
				if (this.__items[e].match(t)) return !0;
			return !1
		}, n.prototype.set_indent = function(t, e) {
			this.__indent_count = t || 0, this.__alignment_count = e || 0, this.__character_count = this.__parent.baseIndentLength + this.__alignment_count + this.__indent_count * this.__parent.indent_length
		}, n.prototype.get_character_count = function() {
			return this.__character_count
		}, n.prototype.is_empty = function() {
			return 0 === this.__items.length
		}, n.prototype.last = function() {
			return this.is_empty() ? null : this.__items[this.__items.length - 1]
		}, n.prototype.push = function(t) {
			this.__items.push(t), this.__character_count += t.length
		}, n.prototype.push_raw = function(t) {
			this.push(t);
			var e = t.lastIndexOf("\n"); - 1 !== e && (this.__character_count = t.length - e)
		}, n.prototype.pop = function() {
			var t = null;
			return this.is_empty() || (t = this.__items.pop(), this.__character_count -= t.length), t
		}, n.prototype.remove_indent = function() {
			this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_length)
		}, n.prototype.trim = function() {
			for (;
				" " === this.last();) this.__items.pop(), this.__character_count -= 1
		}, n.prototype.toString = function() {
			var t = "";
			return this.is_empty() || (this.__indent_count >= 0 && (t = this.__parent.get_indent_string(this.__indent_count)), this.__alignment_count >= 0 && (t += this.__parent.get_alignment_string(this.__alignment_count)), t += this.__items.join("")), t
		}, s.prototype.__ensure_cache = function(t) {
			for (; t >= this.__cache.length;) this.__cache.push(this.__cache[this.__cache.length - 1] + this.__level_string)
		}, s.prototype.get_level_string = function(t) {
			return this.__ensure_cache(t), this.__cache[t]
		}, _.prototype.__add_outputline = function() {
			this.previous_line = this.current_line, this.current_line = new n(this), this.__lines.push(this.current_line)
		}, _.prototype.get_line_number = function() {
			return this.__lines.length
		}, _.prototype.get_indent_string = function(t) {
			return this.__indent_cache.get_level_string(t)
		}, _.prototype.get_alignment_string = function(t) {
			return this.__alignment_cache.get_level_string(t)
		}, _.prototype.is_empty = function() {
			return !this.previous_line && this.current_line.is_empty()
		}, _.prototype.add_new_line = function(t) {
			return !(this.is_empty() || !t && this.just_added_newline()) && (this.raw || this.__add_outputline(), !0)
		}, _.prototype.get_code = function(t) {
			var e = this.__lines.join("\n").replace(/[\r\n\t ]+$/, "");
			return this._end_with_newline && (e += "\n"), "\n" !== t && (e = e.replace(/[\n]/g, t)), e
		}, _.prototype.set_indent = function(t, e) {
			return t = t || 0, e = e || 0, this.__lines.length > 1 ? (this.current_line.set_indent(t, e), !0) : (this.current_line.set_indent(), !1)
		}, _.prototype.add_raw_token = function(t) {
			for (var e = 0; e < t.newlines; e++) this.__add_outputline();
			this.current_line.push(t.whitespace_before), this.current_line.push_raw(t.text), this.space_before_token = !1
		}, _.prototype.add_token = function(t) {
			this.add_space_before_token(), this.current_line.push(t)
		}, _.prototype.add_space_before_token = function() {
			this.space_before_token && !this.just_added_newline() && this.current_line.push(" "), this.space_before_token = !1
		}, _.prototype.remove_indent = function(t) {
			for (var e = this.__lines.length; t < e;) this.__lines[t].remove_indent(), t++
		}, _.prototype.trim = function(t) {
			for (t = void 0 !== t && t, this.current_line.trim(this.indent_string, this.baseIndentString); t && this.__lines.length > 1 && this.current_line.is_empty();) this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
			this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null
		}, _.prototype.just_added_newline = function() {
			return this.current_line.is_empty()
		}, _.prototype.just_added_blankline = function() {
			return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty()
		}, _.prototype.ensure_empty_line_above = function(t, e) {
			for (var i = this.__lines.length - 2; i >= 0;) {
				var s = this.__lines[i];
				if (s.is_empty()) break;
				if (0 !== s.item(0).indexOf(t) && s.item(-1) !== e) {
					this.__lines.splice(i + 1, 0, new n(this)), this.previous_line = this.__lines[this.__lines.length - 2];
					break
				}
				i--
			}
		}, t.exports.Output = _
	}, function(t, e, i) {
		"use strict";

		function n(t, e) {
			this.raw_options = s(t, e), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol", "auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number("indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number("indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", !0), this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0), this.indent_with_tabs = this._get_boolean("indent_with_tabs"), this.indent_with_tabs && (this.indent_char = "\t", this.indent_size = 1), this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char"))
		}

		function s(t, e) {
			var i, n = {};
			for (i in t = _(t)) i !== e && (n[i] = t[i]);
			if (e && t[e])
				for (i in t[e]) n[i] = t[e][i];
			return n
		}

		function _(t) {
			var e, i = {};
			for (e in t) {
				i[e.replace(/-/g, "_")] = t[e]
			}
			return i
		}
		n.prototype._get_array = function(t, e) {
			var i = this.raw_options[t],
				n = e || [];
			return "object" == typeof i ? null !== i && "function" == typeof i.concat && (n = i.concat()) : "string" == typeof i && (n = i.split(/[^a-zA-Z0-9_\/\-]+/)), n
		}, n.prototype._get_boolean = function(t, e) {
			var i = this.raw_options[t];
			return void 0 === i ? !!e : !!i
		}, n.prototype._get_characters = function(t, e) {
			var i = this.raw_options[t],
				n = e || "";
			return "string" == typeof i && (n = i.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "\t")), n
		}, n.prototype._get_number = function(t, e) {
			var i = this.raw_options[t];
			e = parseInt(e, 10), isNaN(e) && (e = 0);
			var n = parseInt(i, 10);
			return isNaN(n) && (n = e), n
		}, n.prototype._get_selection = function(t, e, i) {
			var n = this._get_selection_list(t, e, i);
			if (1 !== n.length) throw new Error("Invalid Option Value: The option '" + t + "' can only be one of the following values:\n" + e + "\nYou passed in: '" + this.raw_options[t] + "'");
			return n[0]
		}, n.prototype._get_selection_list = function(t, e, i) {
			if (!e || 0 === e.length) throw new Error("Selection list cannot be empty.");
			if (i = i || [e[0]], !this._is_valid_selection(i, e)) throw new Error("Invalid Default Value!");
			var n = this._get_array(t, i);
			if (!this._is_valid_selection(n, e)) throw new Error("Invalid Option Value: The option '" + t + "' can contain only the following values:\n" + e + "\nYou passed in: '" + this.raw_options[t] + "'");
			return n
		}, n.prototype._is_valid_selection = function(t, e) {
			return t.length && e.length && !t.some(function(t) {
				return -1 === e.indexOf(t)
			})
		}, t.exports.Options = n, t.exports.normalizeOpts = _, t.exports.mergeOpts = s
	}, function(t, e, i) {
		"use strict";

		function n(t) {
			this.__input = t || "", this.__input_length = this.__input.length, this.__position = 0
		}
		n.prototype.restart = function() {
			this.__position = 0
		}, n.prototype.back = function() {
			this.__position > 0 && (this.__position -= 1)
		}, n.prototype.hasNext = function() {
			return this.__position < this.__input_length
		}, n.prototype.next = function() {
			var t = null;
			return this.hasNext() && (t = this.__input.charAt(this.__position), this.__position += 1), t
		}, n.prototype.peek = function(t) {
			var e = null;
			return t = t || 0, (t += this.__position) >= 0 && t < this.__input_length && (e = this.__input.charAt(t)), e
		}, n.prototype.test = function(t, e) {
			if (e = e || 0, e += this.__position, t.lastIndex = e, e >= 0 && e < this.__input_length) {
				var i = t.exec(this.__input);
				return i && i.index === e
			}
			return !1
		}, n.prototype.testChar = function(t, e) {
			var i = this.peek(e);
			return null !== i && t.test(i)
		}, n.prototype.match = function(t) {
			t.lastIndex = this.__position;
			var e = t.exec(this.__input);
			return e && e.index === this.__position ? this.__position += e[0].length : e = null, e
		}, n.prototype.read = function(t) {
			var e = "",
				i = this.match(t);
			return i && (e = i[0]), e
		}, n.prototype.readUntil = function(t, e) {
			var i, n = this.__position;
			t.lastIndex = this.__position;
			var s = t.exec(this.__input);
			return n = s ? e ? s.index + s[0].length : s.index : this.__input_length, i = this.__input.substring(this.__position, n), this.__position = n, i
		}, n.prototype.readUntilAfter = function(t) {
			return this.readUntil(t, !0)
		}, n.prototype.peekUntilAfter = function(t) {
			var e = this.__position,
				i = this.readUntilAfter(t);
			return this.__position = e, i
		}, n.prototype.lookBack = function(t) {
			var e = this.__position - 1;
			return e >= t.length && this.__input.substring(e - t.length, e).toLowerCase() === t
		}, t.exports.InputScanner = n
	}, function(t, e, i) {
		"use strict";
		t.exports.Token = function(t, e, i, n) {
			this.type = t, this.text = e, this.comments_before = null, this.newlines = i || 0, this.whitespace_before = n || "", this.parent = null, this.next = null, this.previous = null, this.opened = null, this.closed = null, this.directives = null
		}
	}, function(t, e, i) {
		"use strict";
		e.identifier = new RegExp("[$@A-Z_a-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ][$0-9A-Z_a-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿]*", "g");
		e.newline = /[\n\r\u2028\u2029]/, e.lineBreak = new RegExp("\r\n|" + e.newline.source), e.allLineBreaks = new RegExp(e.lineBreak.source, "g")
	}, function(t, e, i) {
		"use strict";

		function n(t, e) {
			t = "string" == typeof t ? t : t.source, e = "string" == typeof e ? e : e.source, this.__directives_block_pattern = new RegExp(t + / beautify( \w+[:]\w+)+ /.source + e, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern = new RegExp("(?:[\\s\\S]*?)((?:" + t + /\sbeautify\signore:end\s/.source + e + ")|$)", "g")
		}
		n.prototype.get_directives = function(t) {
			if (!t.match(this.__directives_block_pattern)) return null;
			var e = {};
			this.__directive_pattern.lastIndex = 0;
			for (var i = this.__directive_pattern.exec(t); i;) e[i[1]] = i[2], i = this.__directive_pattern.exec(t);
			return e
		}, n.prototype.readIgnored = function(t) {
			return t.read(this.__directives_end_ignore_pattern)
		}, t.exports.Directives = n
	}, function(t, e, i) {
		"use strict";
		var n = i(1).Tokenizer,
			s = i(1).TOKEN,
			_ = i(7).Directives,
			o = {
				TAG_OPEN: "TK_TAG_OPEN",
				TAG_CLOSE: "TK_TAG_CLOSE",
				ATTRIBUTE: "TK_ATTRIBUTE",
				EQUALS: "TK_EQUALS",
				VALUE: "TK_VALUE",
				COMMENT: "TK_COMMENT",
				TEXT: "TK_TEXT",
				UNKNOWN: "TK_UNKNOWN",
				START: s.START,
				RAW: s.RAW,
				EOF: s.EOF
			},
			r = new _(/<\!--/, /-->/),
			a = function(t, e) {
				n.call(this, t, e), this._current_tag_name = "", this._word_pattern = this._options.indent_handlebars ? /[\n\r\t <]|{{/g : /[\n\r\t <]/g
			};
		(a.prototype = new n)._is_comment = function(t) {
			return !1
		}, a.prototype._is_opening = function(t) {
			return t.type === o.TAG_OPEN
		}, a.prototype._is_closing = function(t, e) {
			return t.type === o.TAG_CLOSE && e && ((">" === t.text || "/>" === t.text) && "<" === e.text[0] || "}}" === t.text && "{" === e.text[0] && "{" === e.text[1])
		}, a.prototype._reset = function() {
			this._current_tag_name = ""
		}, a.prototype._get_next_token = function(t, e) {
			this._readWhitespace();
			var i = null,
				n = this._input.peek();
			return null === n ? this._create_token(o.EOF, "") : i = (i = (i = (i = (i = (i = (i = i || this._read_attribute(n, t, e)) || this._read_raw_content(t, e)) || this._read_comment(n)) || this._read_open(n, e)) || this._read_close(n, e)) || this._read_content_word()) || this._create_token(o.UNKNOWN, this._input.next())
		}, a.prototype._read_comment = function(t) {
			var e = null;
			if ("<" === t || "{" === t) {
				var i = this._input.peek(1),
					n = this._input.peek(2);
				if ("<" === t && ("!" === i || "?" === i || "%" === i) || this._options.indent_handlebars && "{" === t && "{" === i && "!" === n) {
					for (var s = "", _ = ">", a = !1, h = this._input.next(); h && ((s += h).charAt(s.length - 1) !== _.charAt(_.length - 1) || -1 === s.indexOf(_));) a || (a = s.length > 10, 0 === s.indexOf("<![if") ? (_ = "<![endif]>", a = !0) : 0 === s.indexOf("<![cdata[") ? (_ = "]]>", a = !0) : 0 === s.indexOf("<![") ? (_ = "]>", a = !0) : 0 === s.indexOf("\x3c!--") ? (_ = "--\x3e", a = !0) : 0 === s.indexOf("{{!--") ? (_ = "--}}", a = !0) : 0 === s.indexOf("{{!") ? 5 === s.length && -1 === s.indexOf("{{!--") && (_ = "}}", a = !0) : 0 === s.indexOf("<?") ? (_ = "?>", a = !0) : 0 === s.indexOf("<%") && (_ = "%>", a = !0)), h = this._input.next();
					var p = r.get_directives(s);
					p && "start" === p.ignore && (s += r.readIgnored(this._input)), (e = this._create_token(o.COMMENT, s)).directives = p
				}
			}
			return e
		}, a.prototype._read_open = function(t, e) {
			var i = null,
				n = null;
			return e || ("<" === t ? (i = this._input.read(/<(?:[^\n\r\t >{][^\n\r\t >{/]*)?/g), n = this._create_token(o.TAG_OPEN, i)) : this._options.indent_handlebars && "{" === t && "{" === this._input.peek(1) && (i = this._input.readUntil(/[\n\r\t }]/g), n = this._create_token(o.TAG_OPEN, i))), n
		}, a.prototype._read_close = function(t, e) {
			var i = null,
				n = null;
			return e && ("<" === e.text[0] && (">" === t || "/" === t && ">" === this._input.peek(1)) ? (i = this._input.next(), "/" === t && (i += this._input.next()), n = this._create_token(o.TAG_CLOSE, i)) : "{" === e.text[0] && "}" === t && "}" === this._input.peek(1) && (this._input.next(), this._input.next(), n = this._create_token(o.TAG_CLOSE, "}}"))), n
		}, a.prototype._read_attribute = function(t, e, i) {
			var n = null,
				s = "";
			if (i && "<" === i.text[0])
				if ("=" === t) n = this._create_token(o.EQUALS, this._input.next());
				else if ('"' === t || "'" === t) {
				for (var _ = this._input.next(), r = "", a = new RegExp(t + "|{{", "g"); this._input.hasNext() && (_ += r = this._input.readUntilAfter(a), '"' !== r[r.length - 1] && "'" !== r[r.length - 1]);) this._input.hasNext() && (_ += this._input.readUntilAfter(/}}/g));
				n = this._create_token(o.VALUE, _)
			} else(s = "{" === t && "{" === this._input.peek(1) ? this._input.readUntilAfter(/}}/g) : this._input.readUntil(/[\n\r\t =\/>]/g)) && (n = e.type === o.EQUALS ? this._create_token(o.VALUE, s) : this._create_token(o.ATTRIBUTE, s));
			return n
		}, a.prototype._is_content_unformatted = function(t) {
			return -1 === this._options.void_elements.indexOf(t) && ("script" === t || "style" === t || -1 !== this._options.content_unformatted.indexOf(t) || -1 !== this._options.unformatted.indexOf(t))
		}, a.prototype._read_raw_content = function(t, e) {
			var i = "";
			if (e && "{" === e.text[0]) i = this._input.readUntil(/}}/g);
			else if (t.type === o.TAG_CLOSE && "<" === t.opened.text[0]) {
				var n = t.opened.text.substr(1).toLowerCase();
				this._is_content_unformatted(n) && (i = this._input.readUntil(new RegExp("</" + n + "[\\n\\r\\t ]*?>", "ig")))
			}
			return i ? this._create_token(o.TEXT, i) : null
		}, a.prototype._read_content_word = function() {
			var t = this._input.readUntil(this._word_pattern);
			if (t) return this._create_token(o.TEXT, t)
		}, t.exports.Tokenizer = a, t.exports.TOKEN = o
	}, function(t, e, i) {
		"use strict";
		var n = i(10),
			s = i(14),
			_ = i(17);
		t.exports.js = n, t.exports.css = s, t.exports.html = function(t, e, i, o) {
			return _(t, e, i = i || n, o = o || s)
		}
	}, function(t, e, i) {
		"use strict";
		var n = i(11).Beautifier;
		t.exports = function(t, e) {
			return new n(t, e).beautify()
		}
	}, function(t, e, i) {
		"use strict";
		var n = i(2).Output,
			s = i(5).Token,
			_ = i(6),
			o = i(12).Options,
			r = i(0).Tokenizer,
			a = i(0).line_starters,
			h = i(0).positionable_operators,
			p = i(0).TOKEN;

		function l(t, e) {
			e.multiline_frame || e.mode === y.ForInitializer || e.mode === y.Conditional || t.remove_indent(e.start_line_index)
		}

		function u(t, e) {
			return -1 !== e.indexOf(t)
		}

		function c(t) {
			return t.replace(/^\s+/g, "")
		}

		function f(t, e) {
			return t && t.type === p.RESERVED && t.text === e
		}

		function d(t, e) {
			return t && t.type === p.RESERVED && u(t.text, e)
		}
		var g = ["case", "return", "do", "if", "throw", "else", "await", "break", "continue", "async"],
			k = function(t) {
				for (var e = {}, i = 0; i < t.length; i++) e[t[i].replace(/-/g, "_")] = t[i];
				return e
			}(["before-newline", "after-newline", "preserve-newline"]),
			m = [k.before_newline, k.preserve_newline],
			y = {
				BlockStatement: "BlockStatement",
				Statement: "Statement",
				ObjectLiteral: "ObjectLiteral",
				ArrayLiteral: "ArrayLiteral",
				ForInitializer: "ForInitializer",
				Conditional: "Conditional",
				Expression: "Expression"
			};

		function w(t) {
			return t === y.ArrayLiteral
		}

		function x(t) {
			return u(t, [y.Expression, y.ForInitializer, y.Conditional])
		}

		function v(t, e) {
			e = e || {}, this._source_text = t || "", this._output = null, this._tokens = null, this._last_last_text = null, this._flags = null, this._previous_flags = null, this._flag_store = null, this._options = new o(e)
		}
		v.prototype.create_flags = function(t, e) {
			var i = 0;
			return t && (i = t.indentation_level, !this._output.just_added_newline() && t.line_indent_level > i && (i = t.line_indent_level)), {
				mode: e,
				parent: t,
				last_token: t ? t.last_token : new s(p.START_BLOCK, ""),
				last_word: t ? t.last_word : "",
				declaration_statement: !1,
				declaration_assignment: !1,
				multiline_frame: !1,
				inline_frame: !1,
				if_block: !1,
				else_block: !1,
				do_block: !1,
				do_while: !1,
				import_block: !1,
				in_case_statement: !1,
				in_case: !1,
				case_body: !1,
				indentation_level: i,
				line_indent_level: t ? t.line_indent_level : i,
				start_line_index: this._output.get_line_number(),
				ternary_depth: 0
			}
		}, v.prototype._reset = function(t) {
			var e = t.match(/^[\t ]*/)[0];
			this._last_last_text = "", this._output = new n(this._options, e), this._output.raw = this._options.test_output_raw, this._flag_store = [], this.set_mode(y.BlockStatement);
			var i = new r(t, this._options);
			return this._tokens = i.tokenize(), t
		}, v.prototype.beautify = function() {
			if (this._options.disabled) return this._source_text;
			var t = this._reset(this._source_text),
				e = this._options.eol;
			"auto" === this._options.eol && (e = "\n", t && _.lineBreak.test(t || "") && (e = t.match(_.lineBreak)[0]));
			for (var i = this._tokens.next(); i;) this.handle_token(i), this._last_last_text = this._flags.last_token.text, this._flags.last_token = i, i = this._tokens.next();
			return this._output.get_code(e)
		}, v.prototype.handle_token = function(t, e) {
			t.type === p.START_EXPR ? this.handle_start_expr(t) : t.type === p.END_EXPR ? this.handle_end_expr(t) : t.type === p.START_BLOCK ? this.handle_start_block(t) : t.type === p.END_BLOCK ? this.handle_end_block(t) : t.type === p.WORD ? this.handle_word(t) : t.type === p.RESERVED ? this.handle_word(t) : t.type === p.SEMICOLON ? this.handle_semicolon(t) : t.type === p.STRING ? this.handle_string(t) : t.type === p.EQUALS ? this.handle_equals(t) : t.type === p.OPERATOR ? this.handle_operator(t) : t.type === p.COMMA ? this.handle_comma(t) : t.type === p.BLOCK_COMMENT ? this.handle_block_comment(t, e) : t.type === p.COMMENT ? this.handle_comment(t, e) : t.type === p.DOT ? this.handle_dot(t) : t.type === p.EOF ? this.handle_eof(t) : (t.type, p.UNKNOWN, this.handle_unknown(t, e))
		}, v.prototype.handle_whitespace_and_comments = function(t, e) {
			var i = t.newlines,
				n = this._options.keep_array_indentation && w(this._flags.mode);
			if (t.comments_before)
				for (var s = t.comments_before.next(); s;) this.handle_whitespace_and_comments(s, e), this.handle_token(s, e), s = t.comments_before.next();
			if (n)
				for (var _ = 0; _ < i; _ += 1) this.print_newline(_ > 0, e);
			else if (this._options.max_preserve_newlines && i > this._options.max_preserve_newlines && (i = this._options.max_preserve_newlines), this._options.preserve_newlines && i > 1) {
				this.print_newline(!1, e);
				for (var o = 1; o < i; o += 1) this.print_newline(!0, e)
			}
		};
		var b = ["async", "break", "continue", "return", "throw", "yield"];
		v.prototype.allow_wrap_or_preserved_newline = function(t, e) {
			if (e = void 0 !== e && e, !this._output.just_added_newline()) {
				var i = this._options.preserve_newlines && t.newlines || e;
				if (u(this._flags.last_token.text, h) || u(t.text, h)) {
					var n = u(this._flags.last_token.text, h) && u(this._options.operator_position, m) || u(t.text, h);
					i = i && n
				}
				if (i) this.print_newline(!1, !0);
				else if (this._options.wrap_line_length) {
					if (d(this._flags.last_token, b)) return;
					this._output.current_line.get_character_count() + t.text.length + (this._output.space_before_token ? 1 : 0) >= this._options.wrap_line_length && this.print_newline(!1, !0)
				}
			}
		}, v.prototype.print_newline = function(t, e) {
			if (!e && ";" !== this._flags.last_token.text && "," !== this._flags.last_token.text && "=" !== this._flags.last_token.text && (this._flags.last_token.type !== p.OPERATOR || "--" === this._flags.last_token.text || "++" === this._flags.last_token.text))
				for (var i = this._tokens.peek(); !(this._flags.mode !== y.Statement || this._flags.if_block && f(i, "else") || this._flags.do_block);) this.restore_mode();
			this._output.add_new_line(t) && (this._flags.multiline_frame = !0)
		}, v.prototype.print_token_line_indentation = function(t) {
			this._output.just_added_newline() && (this._options.keep_array_indentation && w(this._flags.mode) && t.newlines ? (this._output.current_line.push(t.whitespace_before), this._output.space_before_token = !1) : this._output.set_indent(this._flags.indentation_level) && (this._flags.line_indent_level = this._flags.indentation_level))
		}, v.prototype.print_token = function(t, e) {
			if (this._output.raw) this._output.add_raw_token(t);
			else {
				if (this._options.comma_first && t.previous && t.previous.type === p.COMMA && this._output.just_added_newline() && "," === this._output.previous_line.last()) {
					var i = this._output.previous_line.pop();
					this._output.previous_line.is_empty() && (this._output.previous_line.push(i), this._output.trim(!0), this._output.current_line.pop(), this._output.trim()), this.print_token_line_indentation(t), this._output.add_token(","), this._output.space_before_token = !0
				}
				e = e || t.text, this.print_token_line_indentation(t), this._output.add_token(e)
			}
		}, v.prototype.indent = function() {
			this._flags.indentation_level += 1
		}, v.prototype.deindent = function() {
			this._flags.indentation_level > 0 && (!this._flags.parent || this._flags.indentation_level > this._flags.parent.indentation_level) && (this._flags.indentation_level -= 1)
		}, v.prototype.set_mode = function(t) {
			this._flags ? (this._flag_store.push(this._flags), this._previous_flags = this._flags) : this._previous_flags = this.create_flags(null, t), this._flags = this.create_flags(this._previous_flags, t)
		}, v.prototype.restore_mode = function() {
			this._flag_store.length > 0 && (this._previous_flags = this._flags, this._flags = this._flag_store.pop(), this._previous_flags.mode === y.Statement && l(this._output, this._previous_flags))
		}, v.prototype.start_of_object_property = function() {
			return this._flags.parent.mode === y.ObjectLiteral && this._flags.mode === y.Statement && (":" === this._flags.last_token.text && 0 === this._flags.ternary_depth || d(this._flags.last_token, ["get", "set"]))
		}, v.prototype.start_of_statement = function(t) {
			var e = !1;
			return !!(e = (e = (e = (e = (e = (e = (e = e || d(this._flags.last_token, ["var", "let", "const"]) && t.type === p.WORD) || f(this._flags.last_token, "do")) || !(this._flags.parent.mode === y.ObjectLiteral && this._flags.mode === y.Statement) && d(this._flags.last_token, b) && !t.newlines) || f(this._flags.last_token, "else") && !(f(t, "if") && !t.comments_before)) || this._flags.last_token.type === p.END_EXPR && (this._previous_flags.mode === y.ForInitializer || this._previous_flags.mode === y.Conditional)) || this._flags.last_token.type === p.WORD && this._flags.mode === y.BlockStatement && !this._flags.in_case && !("--" === t.text || "++" === t.text) && "function" !== this._last_last_text && t.type !== p.WORD && t.type !== p.RESERVED) || this._flags.mode === y.ObjectLiteral && (":" === this._flags.last_token.text && 0 === this._flags.ternary_depth || d(this._flags.last_token, ["get", "set"]))) && (this.set_mode(y.Statement), this.indent(), this.handle_whitespace_and_comments(t, !0), this.start_of_object_property() || this.allow_wrap_or_preserved_newline(t, d(t, ["do", "for", "if", "while"])), !0)
		}, v.prototype.handle_start_expr = function(t) {
			this.start_of_statement(t) || this.handle_whitespace_and_comments(t);
			var e = y.Expression;
			if ("[" === t.text) {
				if (this._flags.last_token.type === p.WORD || ")" === this._flags.last_token.text) return d(this._flags.last_token, a) && (this._output.space_before_token = !0), this.set_mode(e), this.print_token(t), this.indent(), void(this._options.space_in_paren && (this._output.space_before_token = !0));
				e = y.ArrayLiteral, w(this._flags.mode) && ("[" !== this._flags.last_token.text && ("," !== this._flags.last_token.text || "]" !== this._last_last_text && "}" !== this._last_last_text) || this._options.keep_array_indentation || this.print_newline()), u(this._flags.last_token.type, [p.START_EXPR, p.END_EXPR, p.WORD, p.OPERATOR]) || (this._output.space_before_token = !0)
			} else {
				if (this._flags.last_token.type === p.RESERVED) "for" === this._flags.last_token.text ? (this._output.space_before_token = this._options.space_before_conditional, e = y.ForInitializer) : u(this._flags.last_token.text, ["if", "while"]) ? (this._output.space_before_token = this._options.space_before_conditional, e = y.Conditional) : u(this._flags.last_word, ["await", "async"]) ? this._output.space_before_token = !0 : "import" === this._flags.last_token.text && "" === t.whitespace_before ? this._output.space_before_token = !1 : (u(this._flags.last_token.text, a) || "catch" === this._flags.last_token.text) && (this._output.space_before_token = !0);
				else if (this._flags.last_token.type === p.EQUALS || this._flags.last_token.type === p.OPERATOR) this.start_of_object_property() || this.allow_wrap_or_preserved_newline(t);
				else if (this._flags.last_token.type === p.WORD) {
					if (this._output.space_before_token = !1, this._options.space_after_named_function) {
						var i = this._tokens.peek(-4),
							n = this._tokens.peek(-3);
						(d(n, ["async", "function"]) || d(i, ["async", "function"]) && "*" === n.text) && (this._output.space_before_token = !0)
					}
				} else this.allow_wrap_or_preserved_newline(t);
				(this._flags.last_token.type === p.RESERVED && ("function" === this._flags.last_word || "typeof" === this._flags.last_word) || "*" === this._flags.last_token.text && (u(this._last_last_text, ["function", "yield"]) || this._flags.mode === y.ObjectLiteral && u(this._last_last_text, ["{", ","]))) && (this._output.space_before_token = this._options.space_after_anon_function)
			}
			";" === this._flags.last_token.text || this._flags.last_token.type === p.START_BLOCK ? this.print_newline() : this._flags.last_token.type !== p.END_EXPR && this._flags.last_token.type !== p.START_EXPR && this._flags.last_token.type !== p.END_BLOCK && "." !== this._flags.last_token.text && this._flags.last_token.type !== p.COMMA || this.allow_wrap_or_preserved_newline(t, t.newlines), this.set_mode(e), this.print_token(t), this._options.space_in_paren && (this._output.space_before_token = !0), this.indent()
		}, v.prototype.handle_end_expr = function(t) {
			for (; this._flags.mode === y.Statement;) this.restore_mode();
			this.handle_whitespace_and_comments(t), this._flags.multiline_frame && this.allow_wrap_or_preserved_newline(t, "]" === t.text && w(this._flags.mode) && !this._options.keep_array_indentation), this._options.space_in_paren && (this._flags.last_token.type !== p.START_EXPR || this._options.space_in_empty_paren ? this._output.space_before_token = !0 : (this._output.trim(), this._output.space_before_token = !1)), "]" === t.text && this._options.keep_array_indentation ? (this.print_token(t), this.restore_mode()) : (this.restore_mode(), this.print_token(t)), l(this._output, this._previous_flags), this._flags.do_while && this._previous_flags.mode === y.Conditional && (this._previous_flags.mode = y.Expression, this._flags.do_block = !1, this._flags.do_while = !1)
		}, v.prototype.handle_start_block = function(t) {
			this.handle_whitespace_and_comments(t);
			var e = this._tokens.peek(),
				i = this._tokens.peek(1);
			"switch" === this._flags.last_word && this._flags.last_token.type === p.END_EXPR ? (this.set_mode(y.BlockStatement), this._flags.in_case_statement = !0) : i && (u(i.text, [":", ","]) && u(e.type, [p.STRING, p.WORD, p.RESERVED]) || u(e.text, ["get", "set", "..."]) && u(i.type, [p.WORD, p.RESERVED])) ? u(this._last_last_text, ["class", "interface"]) ? this.set_mode(y.BlockStatement) : this.set_mode(y.ObjectLiteral) : this._flags.last_token.type === p.OPERATOR && "=>" === this._flags.last_token.text ? this.set_mode(y.BlockStatement) : u(this._flags.last_token.type, [p.EQUALS, p.START_EXPR, p.COMMA, p.OPERATOR]) || d(this._flags.last_token, ["return", "throw", "import", "default"]) ? this.set_mode(y.ObjectLiteral) : this.set_mode(y.BlockStatement);
			var n = !e.comments_before && "}" === e.text && "function" === this._flags.last_word && this._flags.last_token.type === p.END_EXPR;
			if (this._options.brace_preserve_inline) {
				var s = 0,
					_ = null;
				this._flags.inline_frame = !0;
				do {
					if (s += 1, (_ = this._tokens.peek(s - 1)).newlines) {
						this._flags.inline_frame = !1;
						break
					}
				} while (_.type !== p.EOF && (_.type !== p.END_BLOCK || _.opened !== t))
			}("expand" === this._options.brace_style || "none" === this._options.brace_style && t.newlines) && !this._flags.inline_frame ? this._flags.last_token.type !== p.OPERATOR && (n || this._flags.last_token.type === p.EQUALS || d(this._flags.last_token, g) && "else" !== this._flags.last_token.text) ? this._output.space_before_token = !0 : this.print_newline(!1, !0) : (!w(this._previous_flags.mode) || this._flags.last_token.type !== p.START_EXPR && this._flags.last_token.type !== p.COMMA || ((this._flags.last_token.type === p.COMMA || this._options.space_in_paren) && (this._output.space_before_token = !0), (this._flags.last_token.type === p.COMMA || this._flags.last_token.type === p.START_EXPR && this._flags.inline_frame) && (this.allow_wrap_or_preserved_newline(t), this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame, this._flags.multiline_frame = !1)), this._flags.last_token.type !== p.OPERATOR && this._flags.last_token.type !== p.START_EXPR && (this._flags.last_token.type !== p.START_BLOCK || this._flags.inline_frame ? this._output.space_before_token = !0 : this.print_newline())), this.print_token(t), this.indent()
		}, v.prototype.handle_end_block = function(t) {
			for (this.handle_whitespace_and_comments(t); this._flags.mode === y.Statement;) this.restore_mode();
			var e = this._flags.last_token.type === p.START_BLOCK;
			this._flags.inline_frame && !e ? this._output.space_before_token = !0 : "expand" === this._options.brace_style ? e || this.print_newline() : e || (w(this._flags.mode) && this._options.keep_array_indentation ? (this._options.keep_array_indentation = !1, this.print_newline(), this._options.keep_array_indentation = !0) : this.print_newline()), this.restore_mode(), this.print_token(t)
		}, v.prototype.handle_word = function(t) {
			if (t.type === p.RESERVED)
				if (u(t.text, ["set", "get"]) && this._flags.mode !== y.ObjectLiteral) t.type = p.WORD;
				else if ("import" === t.text && "(" === this._tokens.peek().text) t.type = p.WORD;
			else if (u(t.text, ["as", "from"]) && !this._flags.import_block) t.type = p.WORD;
			else if (this._flags.mode === y.ObjectLiteral) {
				":" === this._tokens.peek().text && (t.type = p.WORD)
			}
			if (this.start_of_statement(t) ? d(this._flags.last_token, ["var", "let", "const"]) && t.type === p.WORD && (this._flags.declaration_statement = !0) : !t.newlines || x(this._flags.mode) || this._flags.last_token.type === p.OPERATOR && "--" !== this._flags.last_token.text && "++" !== this._flags.last_token.text || this._flags.last_token.type === p.EQUALS || !this._options.preserve_newlines && d(this._flags.last_token, ["var", "let", "const", "set", "get"]) ? this.handle_whitespace_and_comments(t) : (this.handle_whitespace_and_comments(t), this.print_newline()), this._flags.do_block && !this._flags.do_while) {
				if (f(t, "while")) return this._output.space_before_token = !0, this.print_token(t), this._output.space_before_token = !0, void(this._flags.do_while = !0);
				this.print_newline(), this._flags.do_block = !1
			}
			if (this._flags.if_block)
				if (!this._flags.else_block && f(t, "else")) this._flags.else_block = !0;
				else {
					for (; this._flags.mode === y.Statement;) this.restore_mode();
					this._flags.if_block = !1, this._flags.else_block = !1
				} if (this._flags.in_case_statement && d(t, ["case", "default"])) return this.print_newline(), (this._flags.case_body || this._options.jslint_happy) && (this.deindent(), this._flags.case_body = !1), this.print_token(t), void(this._flags.in_case = !0);
			if (this._flags.last_token.type !== p.COMMA && this._flags.last_token.type !== p.START_EXPR && this._flags.last_token.type !== p.EQUALS && this._flags.last_token.type !== p.OPERATOR || this.start_of_object_property() || this.allow_wrap_or_preserved_newline(t), f(t, "function")) return (u(this._flags.last_token.text, ["}", ";"]) || this._output.just_added_newline() && !u(this._flags.last_token.text, ["(", "[", "{", ":", "=", ","]) && this._flags.last_token.type !== p.OPERATOR) && (this._output.just_added_blankline() || t.comments_before || (this.print_newline(), this.print_newline(!0))), this._flags.last_token.type === p.RESERVED || this._flags.last_token.type === p.WORD ? d(this._flags.last_token, ["get", "set", "new", "export"]) || d(this._flags.last_token, b) ? this._output.space_before_token = !0 : f(this._flags.last_token, "default") && "export" === this._last_last_text ? this._output.space_before_token = !0 : "declare" === this._flags.last_token.text ? this._output.space_before_token = !0 : this.print_newline() : this._flags.last_token.type === p.OPERATOR || "=" === this._flags.last_token.text ? this._output.space_before_token = !0 : (this._flags.multiline_frame || !x(this._flags.mode) && !w(this._flags.mode)) && this.print_newline(), this.print_token(t), void(this._flags.last_word = t.text);
			var e = "NONE";
			(this._flags.last_token.type === p.END_BLOCK ? this._previous_flags.inline_frame ? e = "SPACE" : d(t, ["else", "catch", "finally", "from"]) ? "expand" === this._options.brace_style || "end-expand" === this._options.brace_style || "none" === this._options.brace_style && t.newlines ? e = "NEWLINE" : (e = "SPACE", this._output.space_before_token = !0) : e = "NEWLINE" : this._flags.last_token.type === p.SEMICOLON && this._flags.mode === y.BlockStatement ? e = "NEWLINE" : this._flags.last_token.type === p.SEMICOLON && x(this._flags.mode) ? e = "SPACE" : this._flags.last_token.type === p.STRING ? e = "NEWLINE" : this._flags.last_token.type === p.RESERVED || this._flags.last_token.type === p.WORD || "*" === this._flags.last_token.text && (u(this._last_last_text, ["function", "yield"]) || this._flags.mode === y.ObjectLiteral && u(this._last_last_text, ["{", ","])) ? e = "SPACE" : this._flags.last_token.type === p.START_BLOCK ? e = this._flags.inline_frame ? "SPACE" : "NEWLINE" : this._flags.last_token.type === p.END_EXPR && (this._output.space_before_token = !0, e = "NEWLINE"), d(t, a) && ")" !== this._flags.last_token.text && (e = this._flags.inline_frame || "else" === this._flags.last_token.text || "export" === this._flags.last_token.text ? "SPACE" : "NEWLINE"), d(t, ["else", "catch", "finally"])) ? (this._flags.last_token.type !== p.END_BLOCK || this._previous_flags.mode !== y.BlockStatement || "expand" === this._options.brace_style || "end-expand" === this._options.brace_style || "none" === this._options.brace_style && t.newlines) && !this._flags.inline_frame ? this.print_newline() : (this._output.trim(!0), "}" !== this._output.current_line.last() && this.print_newline(), this._output.space_before_token = !0): "NEWLINE" === e ? d(this._flags.last_token, g) ? this._output.space_before_token = !0 : "declare" === this._flags.last_token.text && d(t, ["var", "let", "const"]) ? this._output.space_before_token = !0 : this._flags.last_token.type !== p.END_EXPR ? this._flags.last_token.type === p.START_EXPR && d(t, ["var", "let", "const"]) || ":" === this._flags.last_token.text || (f(t, "if") && f(t.previous, "else") ? this._output.space_before_token = !0 : this.print_newline()) : d(t, a) && ")" !== this._flags.last_token.text && this.print_newline() : this._flags.multiline_frame && w(this._flags.mode) && "," === this._flags.last_token.text && "}" === this._last_last_text ? this.print_newline() : "SPACE" === e && (this._output.space_before_token = !0);
			!t.previous || t.previous.type !== p.WORD && t.previous.type !== p.RESERVED || (this._output.space_before_token = !0), this.print_token(t), this._flags.last_word = t.text, t.type === p.RESERVED && ("do" === t.text ? this._flags.do_block = !0 : "if" === t.text ? this._flags.if_block = !0 : "import" === t.text ? this._flags.import_block = !0 : this._flags.import_block && f(t, "from") && (this._flags.import_block = !1))
		}, v.prototype.handle_semicolon = function(t) {
			this.start_of_statement(t) ? this._output.space_before_token = !1 : this.handle_whitespace_and_comments(t);
			for (var e = this._tokens.peek(); !(this._flags.mode !== y.Statement || this._flags.if_block && f(e, "else") || this._flags.do_block);) this.restore_mode();
			this._flags.import_block && (this._flags.import_block = !1), this.print_token(t)
		}, v.prototype.handle_string = function(t) {
			this.start_of_statement(t) ? this._output.space_before_token = !0 : (this.handle_whitespace_and_comments(t), this._flags.last_token.type === p.RESERVED || this._flags.last_token.type === p.WORD || this._flags.inline_frame ? this._output.space_before_token = !0 : this._flags.last_token.type === p.COMMA || this._flags.last_token.type === p.START_EXPR || this._flags.last_token.type === p.EQUALS || this._flags.last_token.type === p.OPERATOR ? this.start_of_object_property() || this.allow_wrap_or_preserved_newline(t) : this.print_newline()), this.print_token(t)
		}, v.prototype.handle_equals = function(t) {
			this.start_of_statement(t) || this.handle_whitespace_and_comments(t), this._flags.declaration_statement && (this._flags.declaration_assignment = !0), this._output.space_before_token = !0, this.print_token(t), this._output.space_before_token = !0
		}, v.prototype.handle_comma = function(t) {
			this.handle_whitespace_and_comments(t, !0), this.print_token(t), this._output.space_before_token = !0, this._flags.declaration_statement ? (x(this._flags.parent.mode) && (this._flags.declaration_assignment = !1), this._flags.declaration_assignment ? (this._flags.declaration_assignment = !1, this.print_newline(!1, !0)) : this._options.comma_first && this.allow_wrap_or_preserved_newline(t)) : this._flags.mode === y.ObjectLiteral || this._flags.mode === y.Statement && this._flags.parent.mode === y.ObjectLiteral ? (this._flags.mode === y.Statement && this.restore_mode(), this._flags.inline_frame || this.print_newline()) : this._options.comma_first && this.allow_wrap_or_preserved_newline(t)
		}, v.prototype.handle_operator = function(t) {
			var e = "*" === t.text && (d(this._flags.last_token, ["function", "yield"]) || u(this._flags.last_token.type, [p.START_BLOCK, p.COMMA, p.END_BLOCK, p.SEMICOLON])),
				i = u(t.text, ["-", "+"]) && (u(this._flags.last_token.type, [p.START_BLOCK, p.START_EXPR, p.EQUALS, p.OPERATOR]) || u(this._flags.last_token.text, a) || "," === this._flags.last_token.text);
			if (this.start_of_statement(t));
			else {
				var n = !e;
				this.handle_whitespace_and_comments(t, n)
			}
			if (d(this._flags.last_token, g)) return this._output.space_before_token = !0, void this.print_token(t);
			if ("*" !== t.text || this._flags.last_token.type !== p.DOT)
				if ("::" !== t.text) {
					if (this._flags.last_token.type === p.OPERATOR && u(this._options.operator_position, m) && this.allow_wrap_or_preserved_newline(t), ":" === t.text && this._flags.in_case) return this._flags.case_body = !0, this.indent(), this.print_token(t), this.print_newline(), void(this._flags.in_case = !1);
					var s = !0,
						_ = !0,
						o = !1;
					if (":" === t.text ? 0 === this._flags.ternary_depth ? s = !1 : (this._flags.ternary_depth -= 1, o = !0) : "?" === t.text && (this._flags.ternary_depth += 1), !i && !e && this._options.preserve_newlines && u(t.text, h)) {
						var r = ":" === t.text,
							l = r && o,
							c = r && !o;
						switch (this._options.operator_position) {
							case k.before_newline:
								return this._output.space_before_token = !c, this.print_token(t), r && !l || this.allow_wrap_or_preserved_newline(t), void(this._output.space_before_token = !0);
							case k.after_newline:
								return this._output.space_before_token = !0, !r || l ? this._tokens.peek().newlines ? this.print_newline(!1, !0) : this.allow_wrap_or_preserved_newline(t) : this._output.space_before_token = !1, this.print_token(t), void(this._output.space_before_token = !0);
							case k.preserve_newline:
								return c || this.allow_wrap_or_preserved_newline(t), s = !(this._output.just_added_newline() || c), this._output.space_before_token = s, this.print_token(t), void(this._output.space_before_token = !0)
						}
					}
					if (e) {
						this.allow_wrap_or_preserved_newline(t), s = !1;
						var f = this._tokens.peek();
						_ = f && u(f.type, [p.WORD, p.RESERVED])
					} else "..." === t.text ? (this.allow_wrap_or_preserved_newline(t), s = this._flags.last_token.type === p.START_BLOCK, _ = !1) : (u(t.text, ["--", "++", "!", "~"]) || i) && (this._flags.last_token.type !== p.COMMA && this._flags.last_token.type !== p.START_EXPR || this.allow_wrap_or_preserved_newline(t), s = !1, _ = !1, !t.newlines || "--" !== t.text && "++" !== t.text || this.print_newline(!1, !0), ";" === this._flags.last_token.text && x(this._flags.mode) && (s = !0), this._flags.last_token.type === p.RESERVED ? s = !0 : this._flags.last_token.type === p.END_EXPR ? s = !("]" === this._flags.last_token.text && ("--" === t.text || "++" === t.text)) : this._flags.last_token.type === p.OPERATOR && (s = u(t.text, ["--", "-", "++", "+"]) && u(this._flags.last_token.text, ["--", "-", "++", "+"]), u(t.text, ["+", "-"]) && u(this._flags.last_token.text, ["--", "++"]) && (_ = !0)), (this._flags.mode !== y.BlockStatement || this._flags.inline_frame) && this._flags.mode !== y.Statement || "{" !== this._flags.last_token.text && ";" !== this._flags.last_token.text || this.print_newline());
					this._output.space_before_token = this._output.space_before_token || s, this.print_token(t), this._output.space_before_token = _
				} else this.print_token(t);
			else this.print_token(t)
		}, v.prototype.handle_block_comment = function(t, e) {
			if (this._output.raw) return this._output.add_raw_token(t), void(t.directives && "end" === t.directives.preserve && (this._output.raw = this._options.test_output_raw));
			if (t.directives) return this.print_newline(!1, e), this.print_token(t), "start" === t.directives.preserve && (this._output.raw = !0), void this.print_newline(!1, !0);
			if (!_.newline.test(t.text) && !t.newlines) return this._output.space_before_token = !0, this.print_token(t), void(this._output.space_before_token = !0);
			var i, n = function(t) {
					for (var e = [], i = (t = t.replace(_.allLineBreaks, "\n")).indexOf("\n"); - 1 !== i;) e.push(t.substring(0, i)), i = (t = t.substring(i + 1)).indexOf("\n");
					return t.length && e.push(t), e
				}(t.text),
				s = !1,
				o = !1,
				r = t.whitespace_before,
				a = r.length;
			for (this.print_newline(!1, e), n.length > 1 && (s = function(t, e) {
					for (var i = 0; i < t.length; i++)
						if (t[i].trim().charAt(0) !== e) return !1;
					return !0
				}(n.slice(1), "*"), o = function(t, e) {
					for (var i, n = 0, s = t.length; n < s; n++)
						if ((i = t[n]) && 0 !== i.indexOf(e)) return !1;
					return !0
				}(n.slice(1), r)), this.print_token(t, n[0]), i = 1; i < n.length; i++) this.print_newline(!1, !0), s ? this.print_token(t, " " + c(n[i])) : o && n[i].length > a ? this.print_token(t, n[i].substring(a)) : this._output.add_token(n[i]);
			this.print_newline(!1, e)
		}, v.prototype.handle_comment = function(t, e) {
			t.newlines ? this.print_newline(!1, e) : this._output.trim(!0), this._output.space_before_token = !0, this.print_token(t), this.print_newline(!1, e)
		}, v.prototype.handle_dot = function(t) {
			this.start_of_statement(t) || this.handle_whitespace_and_comments(t, !0), d(this._flags.last_token, g) ? this._output.space_before_token = !1 : this.allow_wrap_or_preserved_newline(t, ")" === this._flags.last_token.text && this._options.break_chained_methods), this._options.unindent_chained_methods && this._output.just_added_newline() && this.deindent(), this.print_token(t)
		}, v.prototype.handle_unknown = function(t, e) {
			this.print_token(t), "\n" === t.text[t.text.length - 1] && this.print_newline(!1, e)
		}, v.prototype.handle_eof = function(t) {
			for (; this._flags.mode === y.Statement;) this.restore_mode();
			this.handle_whitespace_and_comments(t)
		}, t.exports.Beautifier = v
	}, function(t, e, i) {
		"use strict";
		var n = i(3).Options,
			s = ["before-newline", "after-newline", "preserve-newline"];

		function _(t) {
			n.call(this, t, "js");
			var e = this.raw_options.brace_style || null;
			"expand-strict" === e ? this.raw_options.brace_style = "expand" : "collapse-preserve-inline" === e ? this.raw_options.brace_style = "collapse,preserve-inline" : void 0 !== this.raw_options.braces_on_own_line && (this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse");
			var i = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
			this.brace_preserve_inline = !1, this.brace_style = "collapse";
			for (var _ = 0; _ < i.length; _++) "preserve-inline" === i[_] ? this.brace_preserve_inline = !0 : this.brace_style = i[_];
			this.unindent_chained_methods = this._get_boolean("unindent_chained_methods"), this.break_chained_methods = this._get_boolean("break_chained_methods"), this.space_in_paren = this._get_boolean("space_in_paren"), this.space_in_empty_paren = this._get_boolean("space_in_empty_paren"), this.jslint_happy = this._get_boolean("jslint_happy"), this.space_after_anon_function = this._get_boolean("space_after_anon_function"), this.space_after_named_function = this._get_boolean("space_after_named_function"), this.keep_array_indentation = this._get_boolean("keep_array_indentation"), this.space_before_conditional = this._get_boolean("space_before_conditional", !0), this.unescape_strings = this._get_boolean("unescape_strings"), this.e4x = this._get_boolean("e4x"), this.comma_first = this._get_boolean("comma_first"), this.operator_position = this._get_selection("operator_position", s), this.test_output_raw = this._get_boolean("test_output_raw"), this.jslint_happy && (this.space_after_anon_function = !0)
		}
		_.prototype = new n, t.exports.Options = _
	}, function(t, e, i) {
		"use strict";

		function n(t) {
			this.__tokens = [], this.__tokens_length = this.__tokens.length, this.__position = 0, this.__parent_token = t
		}
		n.prototype.restart = function() {
			this.__position = 0
		}, n.prototype.isEmpty = function() {
			return 0 === this.__tokens_length
		}, n.prototype.hasNext = function() {
			return this.__position < this.__tokens_length
		}, n.prototype.next = function() {
			var t = null;
			return this.hasNext() && (t = this.__tokens[this.__position], this.__position += 1), t
		}, n.prototype.peek = function(t) {
			var e = null;
			return t = t || 0, (t += this.__position) >= 0 && t < this.__tokens_length && (e = this.__tokens[t]), e
		}, n.prototype.add = function(t) {
			this.__parent_token && (t.parent = this.__parent_token), this.__tokens.push(t), this.__tokens_length += 1
		}, t.exports.TokenStream = n
	}, function(t, e, i) {
		"use strict";
		var n = i(15).Beautifier;
		t.exports = function(t, e) {
			return new n(t, e).beautify()
		}
	}, function(t, e, i) {
		"use strict";
		var n = i(16).Options,
			s = i(2).Output,
			_ = i(4).InputScanner,
			o = /\r\n|[\r\n]/,
			r = /\r\n|[\r\n]/g,
			a = /\s/,
			h = /(?:\s|\n)+/g,
			p = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,
			l = /\/\/(?:[^\n\r\u2028\u2029]*)/g;

		function u(t, e) {
			this._source_text = t || "", this._options = new n(e), this._ch = null, this._input = null, this.NESTED_AT_RULE = {
				"@page": !0,
				"@font-face": !0,
				"@keyframes": !0,
				"@media": !0,
				"@supports": !0,
				"@document": !0
			}, this.CONDITIONAL_GROUP_RULE = {
				"@media": !0,
				"@supports": !0,
				"@document": !0
			}
		}
		u.prototype.eatString = function(t) {
			var e = "";
			for (this._ch = this._input.next(); this._ch;) {
				if (e += this._ch, "\\" === this._ch) e += this._input.next();
				else if (-1 !== t.indexOf(this._ch) || "\n" === this._ch) break;
				this._ch = this._input.next()
			}
			return e
		}, u.prototype.eatWhitespace = function(t) {
			for (var e = a.test(this._input.peek()), i = !0; a.test(this._input.peek());) this._ch = this._input.next(), t && "\n" === this._ch && (this._options.preserve_newlines || i) && (i = !1, this._output.add_new_line(!0));
			return e
		}, u.prototype.foundNestedPseudoClass = function() {
			for (var t = 0, e = 1, i = this._input.peek(e); i;) {
				if ("{" === i) return !0;
				if ("(" === i) t += 1;
				else if (")" === i) {
					if (0 === t) return !1;
					t -= 1
				} else if (";" === i || "}" === i) return !1;
				e++, i = this._input.peek(e)
			}
			return !1
		}, u.prototype.print_string = function(t) {
			this._output.just_added_newline() && this._output.set_indent(this._indentLevel), this._output.add_token(t)
		}, u.prototype.preserveSingleSpace = function(t) {
			t && (this._output.space_before_token = !0)
		}, u.prototype.indent = function() {
			this._indentLevel++
		}, u.prototype.outdent = function() {
			this._indentLevel > 0 && this._indentLevel--
		}, u.prototype.beautify = function() {
			if (this._options.disabled) return this._source_text;
			var t = this._source_text,
				e = this._options.eol;
			"auto" === e && (e = "\n", t && o.test(t || "") && (e = t.match(o)[0]));
			var i = (t = t.replace(r, "\n")).match(/^[\t ]*/)[0];
			this._output = new s(this._options, i), this._input = new _(t), this._indentLevel = 0, this._nestedLevel = 0, this._ch = null;
			for (var n = 0, u = !1, c = !1, f = !1, d = !1, g = !1, k = this._ch;;) {
				var m = "" !== this._input.read(h),
					y = k;
				if (this._ch = this._input.next(), k = this._ch, !this._ch) break;
				if ("/" === this._ch && "*" === this._input.peek()) this._output.add_new_line(), this._input.back(), this.print_string(this._input.read(p)), this.eatWhitespace(!0), this._output.add_new_line();
				else if ("/" === this._ch && "/" === this._input.peek()) this._output.space_before_token = !0, this._input.back(), this.print_string(this._input.read(l)), this.eatWhitespace(!0);
				else if ("@" === this._ch)
					if (this.preserveSingleSpace(m), "{" === this._input.peek()) this.print_string(this._ch + this.eatString("}"));
					else {
						this.print_string(this._ch);
						var w = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
						w.match(/[ :]$/) && (w = this.eatString(": ").replace(/\s$/, ""), this.print_string(w), this._output.space_before_token = !0), "extend" === (w = w.replace(/\s$/, "")) ? d = !0 : "import" === w && (g = !0), w in this.NESTED_AT_RULE ? (this._nestedLevel += 1, w in this.CONDITIONAL_GROUP_RULE && (f = !0)) : u || 0 !== n || -1 === w.indexOf(":") || (c = !0, this.indent())
					}
				else "#" === this._ch && "{" === this._input.peek() ? (this.preserveSingleSpace(m), this.print_string(this._ch + this.eatString("}"))) : "{" === this._ch ? (c && (c = !1, this.outdent()), this.indent(), this._output.space_before_token = !0, this.print_string(this._ch), f ? (f = !1, u = this._indentLevel > this._nestedLevel) : u = this._indentLevel >= this._nestedLevel, this._options.newline_between_rules && u && this._output.previous_line && "{" !== this._output.previous_line.item(-1) && this._output.ensure_empty_line_above("/", ","), this.eatWhitespace(!0), this._output.add_new_line()) : "}" === this._ch ? (this.outdent(), this._output.add_new_line(), "{" === y && this._output.trim(!0), g = !1, d = !1, c && (this.outdent(), c = !1), this.print_string(this._ch), u = !1, this._nestedLevel && this._nestedLevel--, this.eatWhitespace(!0), this._output.add_new_line(), this._options.newline_between_rules && !this._output.just_added_blankline() && "}" !== this._input.peek() && this._output.add_new_line(!0)) : ":" === this._ch ? !u && !f || this._input.lookBack("&") || this.foundNestedPseudoClass() || this._input.lookBack("(") || d ? (this._input.lookBack(" ") && (this._output.space_before_token = !0), ":" === this._input.peek() ? (this._ch = this._input.next(), this.print_string("::")) : this.print_string(":")) : (this.print_string(":"), c || (c = !0, this._output.space_before_token = !0, this.eatWhitespace(!0), this.indent())) : '"' === this._ch || "'" === this._ch ? (this.preserveSingleSpace(m), this.print_string(this._ch + this.eatString(this._ch)), this.eatWhitespace(!0)) : ";" === this._ch ? (c && (this.outdent(), c = !1), d = !1, g = !1, this.print_string(this._ch), this.eatWhitespace(!0), "/" !== this._input.peek() && this._output.add_new_line()) : "(" === this._ch ? this._input.lookBack("url") ? (this.print_string(this._ch), this.eatWhitespace(), this._ch = this._input.next(), ")" === this._ch || '"' === this._ch || "'" === this._ch ? (this._input.back(), n++) : this._ch && this.print_string(this._ch + this.eatString(")"))) : (n++, this.preserveSingleSpace(m), this.print_string(this._ch), this.eatWhitespace()) : ")" === this._ch ? (this.print_string(this._ch), n--) : "," === this._ch ? (this.print_string(this._ch), this.eatWhitespace(!0), this._options.selector_separator_newline && !c && n < 1 && !g ? this._output.add_new_line() : this._output.space_before_token = !0) : (">" === this._ch || "+" === this._ch || "~" === this._ch) && !c && n < 1 ? this._options.space_around_combinator ? (this._output.space_before_token = !0, this.print_string(this._ch), this._output.space_before_token = !0) : (this.print_string(this._ch), this.eatWhitespace(), this._ch && a.test(this._ch) && (this._ch = "")) : "]" === this._ch ? this.print_string(this._ch) : "[" === this._ch ? (this.preserveSingleSpace(m), this.print_string(this._ch)) : "=" === this._ch ? (this.eatWhitespace(), this.print_string("="), a.test(this._ch) && (this._ch = "")) : "!" === this._ch ? (this.print_string(" "), this.print_string(this._ch)) : (this.preserveSingleSpace(m), this.print_string(this._ch))
			}
			return this._output.get_code(e)
		}, t.exports.Beautifier = u
	}, function(t, e, i) {
		"use strict";
		var n = i(3).Options;

		function s(t) {
			n.call(this, t, "css"), this.selector_separator_newline = this._get_boolean("selector_separator_newline", !0), this.newline_between_rules = this._get_boolean("newline_between_rules", !0);
			var e = this._get_boolean("space_around_selector_separator");
			this.space_around_combinator = this._get_boolean("space_around_combinator") || e
		}
		s.prototype = new n, t.exports.Options = s
	}, function(t, e, i) {
		"use strict";
		var n = i(18).Beautifier;
		t.exports = function(t, e, i, s) {
			return new n(t, e, i, s).beautify()
		}
	}, function(t, e, i) {
		"use strict";
		var n = i(19).Options,
			s = i(2).Output,
			_ = i(8).Tokenizer,
			o = i(8).TOKEN,
			r = /\r\n|[\r\n]/,
			a = /\r\n|[\r\n]/g,
			h = function(t, e) {
				this.indent_level = 0, this.alignment_size = 0, this.wrap_line_length = t.wrap_line_length, this.max_preserve_newlines = t.max_preserve_newlines, this.preserve_newlines = t.preserve_newlines, this._output = new s(t, e)
			};
		h.prototype.current_line_has_match = function(t) {
			return this._output.current_line.has_match(t)
		}, h.prototype.set_space_before_token = function(t) {
			this._output.space_before_token = t
		}, h.prototype.add_raw_token = function(t) {
			this._output.add_raw_token(t)
		}, h.prototype.print_preserved_newlines = function(t) {
			var e = 0;
			t.type !== o.TEXT && t.previous.type !== o.TEXT && (e = t.newlines ? 1 : 0), this.preserve_newlines && (e = t.newlines < this.max_preserve_newlines + 1 ? t.newlines : this.max_preserve_newlines + 1);
			for (var i = 0; i < e; i++) this.print_newline(i > 0);
			return 0 !== e
		}, h.prototype.traverse_whitespace = function(t) {
			return !(!t.whitespace_before && !t.newlines) && (this.print_preserved_newlines(t) || (this._output.space_before_token = !0, this.print_space_or_wrap(t.text)), !0)
		}, h.prototype.print_space_or_wrap = function(t) {
			return !!(this.wrap_line_length && this._output.current_line.get_character_count() + t.length + 1 >= this.wrap_line_length) && this._output.add_new_line()
		}, h.prototype.print_newline = function(t) {
			this._output.add_new_line(t)
		}, h.prototype.print_token = function(t) {
			t && (this._output.current_line.is_empty() && this._output.set_indent(this.indent_level, this.alignment_size), this._output.add_token(t))
		}, h.prototype.print_raw_text = function(t) {
			this._output.current_line.push_raw(t)
		}, h.prototype.indent = function() {
			this.indent_level++
		}, h.prototype.unindent = function() {
			this.indent_level > 0 && this.indent_level--
		}, h.prototype.get_full_indent = function(t) {
			return (t = this.indent_level + (t || 0)) < 1 ? "" : this._output.get_indent_string(t)
		};

		function p(t, e) {
			return -1 !== e.indexOf(t)
		}

		function l(t) {
			this._printer = t, this._current_frame = null
		}

		function u(t, e, i, s) {
			this._source_text = t || "", e = e || {}, this._js_beautify = i, this._css_beautify = s, this._tag_stack = null;
			var _ = new n(e, "html");
			this._options = _, this._is_wrap_attributes_force = "force" === this._options.wrap_attributes.substr(0, "force".length), this._is_wrap_attributes_force_expand_multiline = "force-expand-multiline" === this._options.wrap_attributes, this._is_wrap_attributes_force_aligned = "force-aligned" === this._options.wrap_attributes, this._is_wrap_attributes_aligned_multiple = "aligned-multiple" === this._options.wrap_attributes, this._is_wrap_attributes_preserve = "preserve" === this._options.wrap_attributes.substr(0, "preserve".length), this._is_wrap_attributes_preserve_aligned = "preserve-aligned" === this._options.wrap_attributes
		}
		l.prototype.get_parser_token = function() {
			return this._current_frame ? this._current_frame.parser_token : null
		}, l.prototype.record_tag = function(t) {
			var e = new function(t, e, i) {
				this.parent = t || null, this.tag = e ? e.tag_name : "", this.indent_level = i || 0, this.parser_token = e || null
			}(this._current_frame, t, this._printer.indent_level);
			this._current_frame = e
		}, l.prototype._try_pop_frame = function(t) {
			var e = null;
			return t && (e = t.parser_token, this._printer.indent_level = t.indent_level, this._current_frame = t.parent), e
		}, l.prototype._get_frame = function(t, e) {
			for (var i = this._current_frame; i && -1 === t.indexOf(i.tag);) {
				if (e && -1 !== e.indexOf(i.tag)) {
					i = null;
					break
				}
				i = i.parent
			}
			return i
		}, l.prototype.try_pop = function(t, e) {
			var i = this._get_frame([t], e);
			return this._try_pop_frame(i)
		}, l.prototype.indent_to_tag = function(t) {
			var e = this._get_frame(t);
			e && (this._printer.indent_level = e.indent_level)
		}, u.prototype.beautify = function() {
			if (this._options.disabled) return this._source_text;
			var t = this._source_text,
				e = this._options.eol;
			"auto" === this._options.eol && (e = "\n", t && r.test(t) && (e = t.match(r)[0])), t = t.replace(a, "\n");
			var i = {
					text: "",
					type: ""
				},
				n = new c,
				s = new h(this._options, ""),
				p = new _(t, this._options).tokenize();
			this._tag_stack = new l(s);
			for (var u = null, f = p.next(); f.type !== o.EOF;) f.type === o.TAG_OPEN || f.type === o.COMMENT ? n = u = this._handle_tag_open(s, f, n, i) : f.type === o.ATTRIBUTE || f.type === o.EQUALS || f.type === o.VALUE || f.type === o.TEXT && !n.tag_complete ? u = this._handle_inside_tag(s, f, n, p) : f.type === o.TAG_CLOSE ? u = this._handle_tag_close(s, f, n) : f.type === o.TEXT ? u = this._handle_text(s, f, n) : s.add_raw_token(f), i = u, f = p.next();
			return s._output.get_code(e)
		}, u.prototype._handle_tag_close = function(t, e, i) {
			var n = {
				text: e.text,
				type: e.type
			};
			return t.alignment_size = 0, i.tag_complete = !0, t.set_space_before_token(e.newlines || "" !== e.whitespace_before), i.is_unformatted ? t.add_raw_token(e) : ("<" === i.tag_start_char && (t.set_space_before_token("/" === e.text[0]), this._is_wrap_attributes_force_expand_multiline && i.has_wrapped_attrs && t.print_newline(!1)), t.print_token(e.text)), !i.indent_content || i.is_unformatted || i.is_content_unformatted || (t.indent(), i.indent_content = !1), n
		}, u.prototype._handle_inside_tag = function(t, e, i, n) {
			var s = {
				text: e.text,
				type: e.type
			};
			if (t.set_space_before_token(e.newlines || "" !== e.whitespace_before), i.is_unformatted) t.add_raw_token(e);
			else if ("{" === i.tag_start_char && e.type === o.TEXT) t.print_preserved_newlines(e) ? t.print_raw_text(e.whitespace_before + e.text) : t.print_token(e.text);
			else {
				if (e.type === o.ATTRIBUTE ? (t.set_space_before_token(!0), i.attr_count += 1) : e.type === o.EQUALS ? t.set_space_before_token(!1) : e.type === o.VALUE && e.previous.type === o.EQUALS && t.set_space_before_token(!1), t._output.space_before_token && "<" === i.tag_start_char) {
					var _ = t.print_space_or_wrap(e.text);
					if (e.type === o.ATTRIBUTE && ((this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) && (t.traverse_whitespace(e), _ = _ || 0 !== e.newlines), i.has_wrapped_attrs = i.has_wrapped_attrs || _, this._is_wrap_attributes_force)) {
						var r = i.attr_count > 1;
						if (this._is_wrap_attributes_force_expand_multiline && 1 === i.attr_count) {
							var a, h = !0,
								p = 0;
							do {
								if ((a = n.peek(p)).type === o.ATTRIBUTE) {
									h = !1;
									break
								}
								p += 1
							} while (p < 4 && a.type !== o.EOF && a.type !== o.TAG_CLOSE);
							r = !h
						}
						r && (t.print_newline(!1), i.has_wrapped_attrs = !0)
					}
				}
				t.print_token(e.text)
			}
			return s
		}, u.prototype._handle_text = function(t, e, i) {
			var n = {
				text: e.text,
				type: "TK_CONTENT"
			};
			return i.custom_beautifier ? this._print_custom_beatifier_text(t, e, i) : i.is_unformatted || i.is_content_unformatted ? t.add_raw_token(e) : (t.traverse_whitespace(e), t.print_token(e.text)), n
		}, u.prototype._print_custom_beatifier_text = function(t, e, i) {
			if ("" !== e.text) {
				t.print_newline(!1);
				var n, s = e.text,
					_ = 1;
				"script" === i.tag_name ? n = "function" == typeof this._js_beautify && this._js_beautify : "style" === i.tag_name && (n = "function" == typeof this._css_beautify && this._css_beautify), "keep" === this._options.indent_scripts ? _ = 0 : "separate" === this._options.indent_scripts && (_ = -t.indent_level);
				var o = t.get_full_indent(_);
				if (s = s.replace(/\n[ \t]*$/, ""), n) {
					var r = function() {
						this.eol = "\n"
					};
					r.prototype = this._options.raw_options, s = n(o + s, new r)
				} else {
					var a = s.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(this._options.indent_string).length - 1,
						h = this._get_full_indent(_ - a);
					s = (o + s.trim()).replace(/\r\n|\r|\n/g, "\n" + h)
				}
				s && (t.print_raw_text(s), t.print_newline(!0))
			}
		}, u.prototype._handle_tag_open = function(t, e, i, n) {
			var s = this._get_tag_open_token(e);
			return (i.is_unformatted || i.is_content_unformatted) && e.type === o.TAG_OPEN && 0 === e.text.indexOf("</") ? t.add_raw_token(e) : (t.traverse_whitespace(e), this._set_tag_position(t, e, s, i, n), t.print_token(e.text)), (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) && (s.alignment_size = e.text.length + 1), s.tag_complete || s.is_unformatted || (t.alignment_size = s.alignment_size), s
		};
		var c = function(t, e) {
			var i;
			(this.parent = t || null, this.text = "", this.type = "TK_TAG_OPEN", this.tag_name = "", this.is_inline_element = !1, this.is_unformatted = !1, this.is_content_unformatted = !1, this.is_empty_element = !1, this.is_start_tag = !1, this.is_end_tag = !1, this.indent_content = !1, this.multiline_content = !1, this.custom_beautifier = !1, this.start_tag_token = null, this.attr_count = 0, this.has_wrapped_attrs = !1, this.alignment_size = 0, this.tag_complete = !1, this.tag_start_char = "", this.tag_check = "", e) ? (this.tag_start_char = e.text[0], this.text = e.text, "<" === this.tag_start_char ? (i = e.text.match(/^<([^\s>]*)/), this.tag_check = i ? i[1] : "") : (i = e.text.match(/^{{\#?([^\s}]+)/), this.tag_check = i ? i[1] : ""), this.tag_check = this.tag_check.toLowerCase(), e.type === o.COMMENT && (this.tag_complete = !0), this.is_start_tag = "/" !== this.tag_check.charAt(0), this.tag_name = this.is_start_tag ? this.tag_check : this.tag_check.substr(1), this.is_end_tag = !this.is_start_tag || e.closed && "/>" === e.closed.text, this.is_end_tag = this.is_end_tag || "{" === this.tag_start_char && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(2)))) : this.tag_complete = !0
		};
		u.prototype._get_tag_open_token = function(t) {
			var e = new c(this._tag_stack.get_parser_token(), t);
			return e.alignment_size = this._options.wrap_attributes_indent_size, e.is_end_tag = e.is_end_tag || p(e.tag_check, this._options.void_elements), e.is_empty_element = e.tag_complete || e.is_start_tag && e.is_end_tag, e.is_unformatted = !e.tag_complete && p(e.tag_check, this._options.unformatted), e.is_content_unformatted = !e.is_empty_element && p(e.tag_check, this._options.content_unformatted), e.is_inline_element = p(e.tag_name, this._options.inline) || "{" === e.tag_start_char, e
		}, u.prototype._set_tag_position = function(t, e, i, n, s) {
			if (i.is_empty_element || (i.is_end_tag ? i.start_tag_token = this._tag_stack.try_pop(i.tag_name) : (this._do_optional_end_element(i), this._tag_stack.record_tag(i), "script" !== i.tag_name && "style" !== i.tag_name || i.is_unformatted || i.is_content_unformatted || (i.custom_beautifier = function(t, e) {
					var i = e.next;
					if (!e.closed) return !1;
					for (; i.type !== o.EOF && i.closed !== e;) {
						if (i.type === o.ATTRIBUTE && "type" === i.text) {
							var n = i.next ? i.next : i,
								s = n.next ? n.next : n;
							return n.type === o.EQUALS && s.type === o.VALUE && ("style" === t && s.text.search("text/css") > -1 || "script" === t && s.text.search(/(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1)
						}
						i = i.next
					}
					return !0
				}(i.tag_check, e)))), p(i.tag_check, this._options.extra_liners) && (t.print_newline(!1), t._output.just_added_blankline() || t.print_newline(!0)), i.is_empty_element) {
				if ("{" === i.tag_start_char && "else" === i.tag_check) this._tag_stack.indent_to_tag(["if", "unless", "each"]), i.indent_content = !0, t.current_line_has_match(/{{#if/) || t.print_newline(!1);
				"!--" === i.tag_name && s.type === o.TAG_CLOSE && n.is_end_tag && -1 === i.text.indexOf("\n") || i.is_inline_element || i.is_unformatted || t.print_newline(!1)
			} else i.is_unformatted || i.is_content_unformatted ? i.is_inline_element || i.is_unformatted || t.print_newline(!1) : i.is_end_tag ? (i.start_tag_token && i.start_tag_token.multiline_content || !(i.is_inline_element || n.is_inline_element || s.type === o.TAG_CLOSE && i.start_tag_token === n || "TK_CONTENT" === s.type)) && t.print_newline(!1) : (i.indent_content = !i.custom_beautifier, "<" === i.tag_start_char && ("html" === i.tag_name ? i.indent_content = this._options.indent_inner_html : "head" === i.tag_name ? i.indent_content = this._options.indent_head_inner_html : "body" === i.tag_name && (i.indent_content = this._options.indent_body_inner_html)), i.is_inline_element || "TK_CONTENT" === s.type || (i.parent && (i.parent.multiline_content = !0), t.print_newline(!1)))
		}, u.prototype._do_optional_end_element = function(t) {
			!t.is_empty_element && t.is_start_tag && t.parent && ("body" === t.tag_name ? this._tag_stack.try_pop("head") : "li" === t.tag_name ? this._tag_stack.try_pop("li", ["ol", "ul"]) : "dd" === t.tag_name || "dt" === t.tag_name ? (this._tag_stack.try_pop("dt", ["dl"]), this._tag_stack.try_pop("dd", ["dl"])) : "rp" === t.tag_name || "rt" === t.tag_name ? (this._tag_stack.try_pop("rt", ["ruby", "rtc"]), this._tag_stack.try_pop("rp", ["ruby", "rtc"])) : "optgroup" === t.tag_name ? this._tag_stack.try_pop("optgroup", ["select"]) : "option" === t.tag_name ? this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]) : "colgroup" === t.tag_name ? this._tag_stack.try_pop("caption", ["table"]) : "thead" === t.tag_name ? (this._tag_stack.try_pop("caption", ["table"]), this._tag_stack.try_pop("colgroup", ["table"])) : "tbody" === t.tag_name || "tfoot" === t.tag_name ? (this._tag_stack.try_pop("caption", ["table"]), this._tag_stack.try_pop("colgroup", ["table"]), this._tag_stack.try_pop("thead", ["table"]), this._tag_stack.try_pop("tbody", ["table"])) : "tr" === t.tag_name ? (this._tag_stack.try_pop("caption", ["table"]), this._tag_stack.try_pop("colgroup", ["table"]), this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"])) : "th" !== t.tag_name && "td" !== t.tag_name || (this._tag_stack.try_pop("td", ["tr"]), this._tag_stack.try_pop("th", ["tr"])), t.parent = this._tag_stack.get_parser_token())
		}, t.exports.Beautifier = u
	}, function(t, e, i) {
		"use strict";
		var n = i(3).Options;

		function s(t) {
			n.call(this, t, "html"), this.indent_inner_html = this._get_boolean("indent_inner_html"), this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", !0), this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", !0), this.indent_handlebars = this._get_boolean("indent_handlebars", !0), this.wrap_attributes = this._get_selection("wrap_attributes", ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]), this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size), this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]), this.inline = this._get_array("inline", ["a", "abbr", "area", "audio", "b", "bdi", "bdo", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "map", "mark", "math", "meter", "noscript", "object", "output", "progress", "q", "ruby", "s", "samp", "select", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "var", "video", "wbr", "text", "acronym", "address", "big", "dt", "ins", "strike", "tt"]), this.void_elements = this._get_array("void_elements", ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr", "!doctype", "?xml", "?php", "?=", "basefont", "isindex"]), this.unformatted = this._get_array("unformatted", []), this.content_unformatted = this._get_array("content_unformatted", ["pre", "textarea"]), this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"])
		}
		s.prototype = new n, t.exports.Options = s
	}])
};

this.getmod = _=>{
	return pretty();
}

}

