
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
  var bf, gridSize, x, y;
  bf = {};
  gridSize = 200;
  bf.state = (function() {
    var i, ref, results;
    results = [];
    for (x = i = 0, ref = gridSize; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      results.push((function() {
        var j, ref1, results1;
        results1 = [];
        for (y = j = 0, ref1 = gridSize; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          results1.push(0);
        }
        return results1;
      })());
    }
    return results;
  })();
  bf.pointer = [0, 0];
  bf.execute = function(input) {
    return console.log(bf);
  };
  return bf;
};
