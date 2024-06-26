# Ideas/Brainstorming

### Features
- Let user drag squares around to rearrange them
    - Shouldn't affect the categories
- Don't let user guess something they've already guessed
- Be able to have more than the normal 4 categories?

### Code
- Set compare to see if submission matches answers, store guesses and set compare to each to 
say if same
- Size of guesses set -> # of guesses used
- Let “words” be an array, of 16 elements to start. Map “correct” + words to 4x4 grid of 
“square”s. (“fillGrid”)
- Shuffle = randomly reorder the array
- For each correct answer, display “answer box” of correct color in a row of the grid, then the 
rest as the remaining “words” elements.
- If correct answer submitted for a color, add (index of/Id of) that color to “correct” array, 
remove the guess’ words from “words” and recompute the grid (useEffect)
- Let people send the link to others

### Overall To-Dos:
- Gameplay:
    - Make an end screen
      - Track guess history
    - When user loses, show the correct answers before the end screen
    - Add animation after incorrect guess
- Aesthetics:
  - Redo layout of Create Screen
  - Add animation when user gets a guess wrong
  - Set a timer on the "one away" message
- Other features:
  - Let user drag squares to rearrange on the Create Screen
  - Make a link to be able to send puzzles to others
  - Make shuffle button work
  - Ability to add more than 4 categories
  - Ability to change color scheme of categories
  - Add a dark mode toggle button
  - Have my own custom puzzles that people can play?
