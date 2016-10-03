
/*
Two Dimensional Brain Fuck
- Use > to move pointer right
- Use < to move pointer left
- Use / to move pointer up (think of reading right and going up stairs)
- Use \ to move pointer down (think of reading right and going down stairs)
- Use + to increment value at pointer
- Use - to decrement value at pointer
- Use . to print current pointer value as a char code
- Use , to prompt user for a num
- Use [] for loops, exit when current val is 0
 */
var brainFuck2d;

brainFuck2d = function() {
  var bf, gridSize;
  bf = {};
  gridSize = 2000;
  bf.num = false;
  bf.state = {};
  bf.DIR_RIGHT = 1;
  bf.DIR_LEFT = -1;
  bf.get = function(p) {
    var x, y;
    x = "" + p[0];
    y = "" + p[1];
    if (bf.state[x + y]) {
      return bf.state[x + y];
    } else {
      return 0;
    }
  };
  bf.change = function(p, c) {
    var x, y;
    x = "" + p[0];
    y = "" + p[1];
    if (bf.state[x + y]) {
      return bf.state[x + y] += c;
    } else {
      return bf.state[x + y] = c;
    }
  };
  bf.pointer = [0, 0];
  bf.tokenize = function(input) {
    var ch, i, j, len, tok, tokens, unmatched;
    tokens = [];
    unmatched = 0;
    for (i = j = 0, len = input.length; j < len; i = ++j) {
      ch = input[i];
      tok = (function() {
        switch (ch) {
          case ">":
            return "POINT_RIGHT";
          case "<":
            return "POINT_LEFT";
          case "/":
            return "POINT_UP";
          case "\\":
            return "POINT_DOWN";
          case "+":
            return "VAL_INC";
          case "-":
            return "VAL_DEC";
          case ".":
            return "VAL_OUTPUT";
          case ",":
            return "VAL_INPUT";
          case "[":
            unmatched++;
            return "LOOP_OPEN";
          case "]":
            unmatched--;
            return "LOOP_CLOSE";
          default:
            return void 0;
        }
      })();
      if (tok) {
        tokens.push(tok);
      }
    }
    if (unmatched !== 0) {
      return "ERROR: Unmatched Loop";
    }
    return tokens;
  };
  bf.find = function(tokens, token, dir) {
    var cur;
    cur = this.instr;
    while (tokens[cur] !== token) {
      cur += dir;
    }
    return cur;
  };
  bf.parse = function(tokens) {
    this.tokens = tokens;
    this.instr = 0;
    this.point = [0, 0];
    this.out = "";
    return function() {
      var ins;
      if (this.instr >= this.tokens.length) {
        return this.out;
      }
      ins = this.tokens[this.instr];
      switch (ins) {
        case "POINT_RIGHT":
          this.point[0]++;
          break;
        case "POINT_LEFT":
          this.point[0]--;
          break;
        case "POINT_DOWN":
          this.point[1]++;
          break;
        case "POINT_UP":
          this.point[1]--;
          break;
        case "VAL_INC":
          this.change(this.point, +1);
          break;
        case "VAL_DEC":
          this.change(this.point, -1);
          break;
        case "VAL_OUTPUT":
          this.out += this.get(this.point);
          break;
        case "VAL_INPUT":
          this.set(this.point, prompt("Input", "").charCodeAt(0));
          break;
        case "LOOP_OPEN":
          if (this.get(this.point) === 0) {
            this.instr = bf.find(this.tokens, "LOOP_CLOSE", this.DIR_RIGHT);
          }
          break;
        case "LOOP_CLOSE":
          this.instr = bf.find(this.tokens, "LOOP_OPEN", this.DIR_LEFT) - 1;
      }
      this.instr++;
      return void 0;
    };
  };
  bf.execute = function(input) {
    var tokens;
    tokens = this.tokenize(input);
    if (typeof this.tokens === "string") {
      return this.tokens;
    }
    return this.parse(tokens).bind(this);
  };
  return bf;
};
