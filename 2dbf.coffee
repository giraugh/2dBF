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

  gridSize = 2000

  # Use numbers over char codes?
  bf.num = false

  # Create 2d state array (init to zero)
  bf.state = {}

  # Direction Constants
  bf.DIR_RIGHT = 1
  bf.DIR_LEFT = -1

  # Used for getting state
  bf.get = (p)->
    x = "#{p[0]}"
    y = "#{p[1]}"
    if bf.state[x+y]
      bf.state[x+y]
    else
      0

  # Used for changing state
  bf.change = (p, c)->
    x = "#{p[0]}"
    y = "#{p[1]}"
    if bf.state[x+y]
      bf.state[x+y] += c
    else
      bf.state[x+y] = c

  # Default pointer
  bf.pointer = [0, 0]

  # Tokenize Input
  bf.tokenize = (input)->
    tokens = []
    unmatched = 0
    for ch, i in input
      tok = switch ch
        when ">"
          "POINT_RIGHT"
        when "<"
          "POINT_LEFT"
        when "/"
          "POINT_UP"
        when "\\"
          "POINT_DOWN"
        when "+"
          "VAL_INC"
        when "-"
          "VAL_DEC"
        when "."
          "VAL_OUTPUT"
        when ","
          "VAL_INPUT"
        when "["
          unmatched++
          "LOOP_OPEN"
        when "]"
          unmatched--
          "LOOP_CLOSE"
        else
          undefined
      if tok
        tokens.push tok

    if unmatched isnt 0
      return "ERROR: Unmatched Loop"

    return tokens

  # Used to find the index of
  # the next token in a direction
  bf.find = (tokens, token, dir)->
    cur = @instr
    while (tokens[cur] != token)
      cur+=dir
    return cur

  # Returns function that parses next token.
  bf.parse = (tokens)->
    @tokens = tokens
    @instr = 0
    @point = [0, 0]
    @out = ""
    return ->
      if @instr >= @tokens.length
        return @out
      ins = @tokens[@instr]
      switch ins
        when "POINT_RIGHT"
          @point[0]++
        when "POINT_LEFT"
          @point[0]--
        when "POINT_DOWN"
          @point[1]++
        when "POINT_UP"
          @point[1]--
        when "VAL_INC"
          @change @point, +1
        when "VAL_DEC"
          @change @point, -1
        when "VAL_OUTPUT"
          @out += @get @point # Need to change to use charcodes
        when "VAL_INPUT"
          @set @point, prompt("Input","").charCodeAt(0) # only accepts single char
        when "LOOP_OPEN"
          # Skip to next close if val is zero
          if @get(@point) is 0
            @instr = bf.find(@tokens, "LOOP_CLOSE", @DIR_RIGHT)
        when "LOOP_CLOSE"
          @instr = bf.find(@tokens, "LOOP_OPEN", @DIR_LEFT)-1
      @instr++
      return undefined

  #Returns parser based on input
  bf.execute = (input)->
    # tokenize input and store it in bf.tokens
    tokens = @tokenize input
    if typeof @tokens is "string" #ERROR
      return @tokens

    return @parse(tokens).bind @

  return bf
