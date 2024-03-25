# Ideas/Brainstorming

### Features
- Let user drag squares around to rearrange them
    - Shouldn't affect the categories
- Don't let user guess something they've already guessed

### Code
- Store into set each element when clicked, remove when reclicked
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