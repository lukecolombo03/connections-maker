import React, {useState} from "react";
import WordSquare from "./WordSquare";
import Mistakes from "./Mistakes";
import AnswerFeedback from "./AnswerFeedback";
import SolvedDisplay from "./SolvedDisplay";
//TODO:
// 1) Shuffle the WordSquares
// 2) Make a shuffle button
// 4) After incorrect answer, do some animation
// 6) Let users drag squares around to rearrange them
export default function PuzzleScreen({
                                         words, title, author, descriptions, mistakes, setMistakes,
                                         answers
                                     }) {
    // console.log(answers);
    /**
     * Position map: every square index (position) has an associated word, and a status (visible or
     * not)
     * (Key, Val) = (position, word)
     * @type {*[]}
     */
    const wordsFlattened = [].concat(...words);
    const positionMap = new Map();
    for (let i = 0; i < wordsFlattened.length; i++) {
        positionMap.set(i, wordsFlattened[i]);
    }
    const [positions, setPositions] = useState(positionMap);
    /**
     * Selected set: the positions of all squares that are selected (highlighted)
     */
    const [selected, setSelected] = useState(new Set());

    // Whether to show the feedback bar or not
    const [showFeedback, setShowFeedback] = useState(false);
    // The flag on the feedback bar: 0 for nothing, 1 for "one away", 2 for "already guessed"
    const [answerFeedbackFlag, setAnswerFeedbackFlag] = useState(0);
    const [showEndScreen, setShowEndScreen] = useState(false);

    /**
     * A list of past guesses, so the user can't guess the same thing twice
     */
    const [guesses, setGuesses] = useState([]);

    /**
     * Whether to make the submit/deselect buttons clickable
     * @type {boolean}
     */
    let readyToSubmit = (selected.size === 4);
    let readyToDeselect = (selected.size > 0);

    /**
     * Whether the answer feedback should be visible
     */
    const [visible, setVisible] = useState(true);

    /**
     Helper function for handleSubmit()
     Compares two arrays and returns true if every element of B is in A
     **/
    function compareArrays(a, b) {
        if (a === b) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        if (a.length !== b.length) {
            return false;
        }
        // console.log("Before\t", a, b);
        a.sort();
        b.sort();
        // console.log("After\t", a, b);
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * All the code for when a user submits a guess
     */
    function handleSubmit() {
        // Make variables for the user's guess and all correct answers
        //TODO: Clean this up it has hella nesting
        const all_answers = Object.keys(answers).map(color => answers[color].words);
        // const all_answers = [...Object.values(answers).map(list => list.slice(0, 4))];
        const guess = Array.from(selected);
        // Check if guess is already guessed: if it is, don't process this guess
        setGuesses([...guesses, guess]);
        // (will be True if some elements of A are the same as B)
        let alreadyGuessed = guesses.some(item => {
            return compareArrays(item, guess);
        });
        if (alreadyGuessed) {
            setShowFeedback(true);
            setVisible(true);
            setAnswerFeedbackFlag(2);
        }
        // Process the guess, can either be correct or incorrect
        else {
            //check if guess is in the list of all answers
            let correct = all_answers.some(item => {
                return compareArrays(item, guess);
            });
            // Handle incorrect guess
            if (!correct) {
                processIncorrectGuess(alreadyGuessed);
            }
            // Handle correct guess
            else {
                processCorrectGuess(guess);
            }
        }
        //deselect all
        setSelected(new Set());
    }

    /**
     * Helper function for handleSubmit
     */
    function processIncorrectGuess(alreadyGuessed) {
        setShowFeedback(true);
        setVisible(true);
        //TODO: Check if its one away
        if (!alreadyGuessed) {
            setAnswerFeedbackFlag(0);
        }
        setMistakes(prev => {
            return prev - 1;
        });
    }


    const [solvedTracker, setSolvedTracker] = useState({...answers});
    // console.log(solvedTracker);
    // Tracks the order in which the colors were solved, to display the SolvedDisplays correctly
    const [solvedOrder, setSolvedOrder] = useState([]);

    // Given a position, return its corresponding color
    function indexToColor(pos) {
        for (let color in solvedTracker) {
            // console.log(solvedTracker[color].words.includes(pos), solvedTracker[color].words)
            // This is the corresponding color if it has the position in it
            if (solvedTracker[color].words.includes(pos)) {
                return color;
            }
            // console.log(color);
        }
    }
    // console.log(indexToColor(4));

    /**
     * Helper function for handleSubmit
     * After correct guess do two things:
     *  1) Remove the guessed words
     *  2) Update the solvedTracker so it displays the SolvedDisplay
     */
    function processCorrectGuess(guess) {
        for (let color in solvedTracker) {
            let correctAnswer = solvedTracker[color]["words"];
            // If we have found the category that this guess belongs to
            if (compareArrays(guess, correctAnswer)) {
                // Update solvedTracker to reflect that this color is solved
                const nextColor = {...solvedTracker[color], solved: true};
                const nextTracker = {...solvedTracker, [color]: nextColor};
                setSolvedTracker(prevState => {
                    return nextTracker;
                });
                const nextOrder = [...solvedOrder, color];
                setSolvedOrder(nextOrder);
            }
        }
        console.log(solvedTracker, solvedOrder);
    }

    // console.log(solvedTracker);

    /**
     * Handle the user clicking on a square
     * @param value
     */
    function handleSelect(value) {
        setSelected(prevSelected => {
            let nextSelected = new Set(prevSelected);
            if (nextSelected.has(value)) {
                nextSelected.delete(value);
            } else {
                if (nextSelected.size < 4) {
                    nextSelected.add(value);
                }
            }
            return nextSelected;
        });
    }

    function handleDeselect() {
        setSelected(new Set());
    }

    return (
        <div className={"puzzle-cont"}>
            <div className={"title-cont"}>
                <span className={"puzzle-title"}>{title}</span>
                <span className={"author"}>{(author !== "" ? "By" : "")} {" "} {author}</span>
            </div>
            <AnswerFeedback show={showFeedback} flag={answerFeedbackFlag} visible={visible}
                            setVisible={setVisible}/>
            {solvedOrder.map((color, index) => (
                <SolvedDisplay words={answers[color].words} color={color} title={answers[color].desc}
                               visible={solvedTracker[color].solved} key={index}/>
            ))}
            <div className={"word-grid puzzle-grid"}>
                {[...positions.keys()].map(pos => (
                    <WordSquare key={pos} text={positions.get(pos)}
                                position={pos}
                                isSelected={selected.has(pos)}
                                onClickProp={handleSelect}
                                visible={!solvedTracker[indexToColor(pos)].solved}/>
                ))}
            </div>
            <div className={"puzzle-bottom"}>
                <Mistakes count={mistakes}/>
                <div className={"bottom-buttons"}>
                    <button className={"puzzle-button"}>Shuffle</button>
                    <button disabled={!readyToDeselect} onClick={handleDeselect}
                            className={"puzzle-button deselect"}>Deselect All
                    </button>
                    <button disabled={!readyToSubmit} onClick={handleSubmit}
                            className={"puzzle-button submit"}>Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
