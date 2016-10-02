###
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

###

brainFuck2d = ->
  # Initialize BF Object
  bf = {}

  gridSize = 200

  # Create 2d state array (init to zero)
  bf.state = for x in [0...gridSize]
    for y in [0...gridSize] then 0

  # Default pointer
  bf.pointer = [0, 0]

  bf.execute = (input)->
    console.log bf

  return bf
