// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
import  cm  from 'codemirror'

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
  mod(require("codemirror/lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
  define(["codemirror/lib/codemirror"], mod);
  else // Plain browser env
  mod(cm);
})(function(cm) {
  "use strict";

  function wordRegexp(words) {
    return new RegExp("^((" + words.join(")|(") + "))\\b");
  }

  var wordOperators = wordRegexp(["et", "ou", "!"]);
  var commonKeywords = ["définir", "tant_que", "répéter", "fois",
  "sinon", "si", "sinon_si"];
  var conditionKeywords = ["mur_en_face","mur_a_gauche","mur_a_droite",
  "sur_un_jeton","a_des_jetons","regarde_nord",
  "regarde_sud","regarde_ouest","regarde_est"];
  var newWords = ["dr"];

  function top(state) {
    return state.scopes[state.scopes.length - 1];
  }

  cm.defineMode("peridot", function(conf, parserConf) {
    var ERRORCLASS = "error";
    var delimiters = parserConf.delimiters || parserConf.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.\\]/;
    //               (Backwards-compatiblity with old, cumbersome config system)
    var operators = [parserConf.singleOperators, parserConf.doubleOperators, parserConf.doubleDelimiters, parserConf.tripleDelimiters,
      parserConf.operators || /^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/]
      for (var i = 0; i < operators.length; i++) if (!operators[i]) operators.splice(i--, 1)

      var hangingIndent = parserConf.hangingIndent || conf.indentUnit;
      var identifiers = parserConf.identifiers|| /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;

      var keywords = wordRegexp(commonKeywords);
      var condition = wordRegexp(conditionKeywords);

      // tokenizers
      function tokenBase(stream, state) {
        var sol = stream.sol() && state.lastToken != "\\"
        if (sol) state.indent = stream.indentation()
        // Handle scope changes
        if (sol && top(state).type == "py") {
          var scopeOffset = top(state).offset;
          if (stream.eatSpace()) {
            var lineOffset = stream.indentation();
            if (lineOffset > scopeOffset)
            pushPyScope(state);
            else if (lineOffset < scopeOffset && dedent(stream, state) && stream.peek() != "#")
            state.errorToken = true;
            return null;
          } else {
            var style = tokenBaseInner(stream, state);
            if (scopeOffset > 0 && dedent(stream, state))
            style += " " + ERRORCLASS;
            return style;
          }
        }
        return tokenBaseInner(stream, state);
      }

      function tokenBaseInner(stream, state) {
        if (stream.eatSpace()) return null;

        // Handle Comments
        if (stream.match(/^#.*/)) return "comment";

        // Handle Number Literals
        if (stream.match(/^[0-9\.]/, false)) {
          var floatLiteral = false;
          // Floats
          if (stream.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)) { floatLiteral = true; }
          if (stream.match(/^[\d_]+\.\d*/)) { floatLiteral = true; }
          if (stream.match(/^\.\d+/)) { floatLiteral = true; }
          if (floatLiteral) {
            // Float literals may be "imaginary"
            stream.eat(/J/i);
            return "number";
          }
          // Integers
          var intLiteral = false;
          // Hex
          if (stream.match(/^0x[0-9a-f_]+/i)) intLiteral = true;
          // Binary
          if (stream.match(/^0b[01_]+/i)) intLiteral = true;
          // Octal
          if (stream.match(/^0o[0-7_]+/i)) intLiteral = true;
          // Decimal
          if (stream.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)) {
            // Decimal literals may be "imaginary"
            stream.eat(/J/i);
            // TODO - Can you have imaginary longs?
            intLiteral = true;
          }
          // Zero by itself with no other piece of number.
          if (stream.match(/^0(?![\dx])/i)) intLiteral = true;
          if (intLiteral) {
            // Integer literals may be "long"
            stream.eat(/L/i);
            return "number";
          }
        }


        for (var i = 0; i < operators.length; i++)
        if (stream.match(operators[i])) return "operator"

        if (stream.match(/[\(\)\:]/)) return "delimiters";
        if (stream.match(delimiters)) return "punctuation";


        if (state.lastToken == "." && stream.match(identifiers))
        return "property";

        if (stream.match(keywords))
        return "keyword";

        if (stream.match(wordOperators))
        return "operator";

        if (stream.match(condition))
        return "condition";

        //custom keywords
        if (stream.match(/avance\b/))
        return "move";
        if (stream.match(/gauche\b/))
        return "left";
        if (stream.match(/pose_un_jeton\b/))
        return "droptoken";
        if (stream.match(/prend_un_jeton\b/))
        return "picktoken";
        if (stream.match(wordRegexp(newWords)))
        return "newinstruction";


        if (stream.match(identifiers)) {
          console.log(stream.current());
          if (state.lastToken == "définir" && stream.peek()!=null){
            //newWords.push(stream.currentToken);
            return "newinstruction";
          }
          return "variable";
        }

        // Handle non-detected items
        stream.next();
        return ERRORCLASS;
      }

      function formatStringFactory(delimiter, tokenOuter) {
        while ("rubf".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
        delimiter = delimiter.substr(1);

        var singleline = delimiter.length == 1;
        var OUTCLASS = "string";

        function tokenNestedExpr(depth) {
          return function(stream, state) {
            var inner = tokenBaseInner(stream, state)
            if (inner == "punctuation") {
              if (stream.current() == "{") {
                state.tokenize = tokenNestedExpr(depth + 1)
              } else if (stream.current() == "}") {
                if (depth > 1) state.tokenize = tokenNestedExpr(depth - 1)
                else state.tokenize = tokenString
              }
            }
            return inner
          }
        }

        function tokenString(stream, state) {
          while (!stream.eol()) {
            stream.eatWhile(/[^'"\{\}\\]/);
            if (stream.eat("\\")) {
              stream.next();
              if (singleline && stream.eol())
              return OUTCLASS;
            } else if (stream.match(delimiter)) {
              state.tokenize = tokenOuter;
              return OUTCLASS;
            } else if (stream.match('{{')) {
              // ignore {{ in f-str
              return OUTCLASS;
            } else if (stream.match('{', false)) {
              // switch to nested mode
              state.tokenize = tokenNestedExpr(0)
              if (stream.current()) return OUTCLASS;
              else return state.tokenize(stream, state)
            } else if (stream.match('}}')) {
              return OUTCLASS;
            } else if (stream.match('}')) {
              // single } in f-string is an error
              return ERRORCLASS;
            } else {
              stream.eat(/['"]/);
            }
          }
          if (singleline) {
            if (parserConf.singleLineStringErrors)
            return ERRORCLASS;
            else
            state.tokenize = tokenOuter;
          }
          return OUTCLASS;
        }
        tokenString.isString = true;
        return tokenString;
      }

      function tokenStringFactory(delimiter, tokenOuter) {
        while ("rubf".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
        delimiter = delimiter.substr(1);

        var singleline = delimiter.length == 1;
        var OUTCLASS = "string";

        function tokenString(stream, state) {
          while (!stream.eol()) {
            stream.eatWhile(/[^'"\\]/);
            if (stream.eat("\\")) {
              stream.next();
              if (singleline && stream.eol())
              return OUTCLASS;
            } else if (stream.match(delimiter)) {
              state.tokenize = tokenOuter;
              return OUTCLASS;
            } else {
              stream.eat(/['"]/);
            }
          }
          if (singleline) {
            if (parserConf.singleLineStringErrors)
            return ERRORCLASS;
            else
            state.tokenize = tokenOuter;
          }
          return OUTCLASS;
        }
        tokenString.isString = true;
        return tokenString;
      }

      function pushPyScope(state) {
        while (top(state).type != "py") state.scopes.pop()
        state.scopes.push({offset: top(state).offset + conf.indentUnit,
          type: "py",
          align: null})
        }

        function pushBracketScope(stream, state, type) {
          var align = stream.match(/^([\s\[\{\(]|#.*)*$/, false) ? null : stream.column() + 1
            state.scopes.push({offset: state.indent + hangingIndent,
              type: type,
              align: align})
            }

            function dedent(stream, state) {
              var indented = stream.indentation();
              while (state.scopes.length > 1 && top(state).offset > indented) {
                if (top(state).type != "py") return true;
                state.scopes.pop();
              }
              return top(state).offset != indented;
            }

            function tokenLexer(stream, state) {
              if (stream.sol()) state.beginningOfLine = true;

              var style = state.tokenize(stream, state);
              var current = stream.current();

              // Handle decorators
              if (state.beginningOfLine && current == "@")
              return stream.match(identifiers, false) ? "meta" : py3 ? "operator" : ERRORCLASS;

              if (/\S/.test(current)) state.beginningOfLine = false;

              if ((style == "variable" || style == "builtin")
              && state.lastToken == "meta")
              style = "meta";

              // Handle scope changes.
              if (current == "pass" || current == "return")
              state.dedent += 1;

              if (current == "lambda") state.lambda = true;
              if (current == ":" && !state.lambda && top(state).type == "py")
              pushPyScope(state);

              if (current.length == 1 && !/string|comment/.test(style)) {
                var delimiter_index = "[({".indexOf(current);
                if (delimiter_index != -1)
                pushBracketScope(stream, state, "])}".slice(delimiter_index, delimiter_index+1));

                delimiter_index = "])}".indexOf(current);
                if (delimiter_index != -1) {
                  if (top(state).type == current) state.indent = state.scopes.pop().offset - hangingIndent
                  else return ERRORCLASS;
                }
              }
              if (state.dedent > 0 && stream.eol() && top(state).type == "py") {
                if (state.scopes.length > 1) state.scopes.pop();
                state.dedent -= 1;
              }

              return style;
            }

            var external = {
              startState: function(basecolumn) {
                return {
                  tokenize: tokenBase,
                  scopes: [{offset: basecolumn || 0, type: "py", align: null}],
                  indent: basecolumn || 0,
                  lastToken: null,
                  lambda: false,
                  dedent: 0
                };
              },

              token: function(stream, state) {
                var addErr = state.errorToken;
                if (addErr) state.errorToken = false;
                var style = tokenLexer(stream, state);

                if (style && style != "comment")
                state.lastToken = (style == "keyword" || style == "punctuation") ? stream.current() : style;
                if (style == "punctuation") style = null;

                if (stream.eol() && state.lambda)
                state.lambda = false;
                return addErr ? style + " " + ERRORCLASS : style;
              },

              indent: function(state, textAfter) {
                if (state.tokenize != tokenBase)
                return state.tokenize.isString ? cm.Pass : 0;

                var scope = top(state), closing = scope.type == textAfter.charAt(0)
                if (scope.align != null)
                return scope.align - (closing ? 1 : 0)
                else
                return scope.offset - (closing ? hangingIndent : 0)
              },

              electricInput: /^\s*[\}\]\)]$/,
              closeBrackets: {triples: "'\""},
              lineComment: "#",
              fold: "indent"
            };
            return external;
          });

        });
