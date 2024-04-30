import React, {useEffect, useState} from "react";
import WordSquare from "./WordSquare";
import Mistakes from "./Mistakes";
import AnswerFeedback from "./AnswerFeedback";
import SolvedDisplay from "./SolvedDisplay";
//TODO:
// 1) Shuffle the WordSquares
// 2) Make a shuffle button
// 3) After correct answer, rearrange those squares, show the description and color, make
//    them unclickable
// 4) After incorrect answer, do some animation
// 6) Let users drag squares around to rearrange them
export default function PuzzleScreen({
                                         words, title, author, descriptions, mistakes, setMistakes,
                                         answers
                                     }) {
    // console.log(descriptions, answers);
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
        const all_answers = [...Object.values(answers).map(list => list.slice(0, 4))];
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

    //TODO: Idea! Have 4 SolvedDisplay components originally, with all 3 pieces of info, then once
    // a user gets a correct guess we just find out what color category it was for, and make the
    // corresponding component visible.
        // Only problem: making sure they display in the order that user guesses them in (could probably
        // use CSS to fix)
    // Other to do: make a toggle so that when a SolvedDisplay is visible, it's corresponding words
    // are automatically invisible
        // Should have an ID for each SolvedDisplay, then an attribute for each WordSquare that
        // indicates which SolvedDisplay it corresponds to

    // Tracks the color, description, and words for each category, along with whether it's solved
    let state =
        {"yellow": {"words": answers["yellow"], "solved": false, "desc": descriptions[0]},
            "green": {"words": answers["green"], "solved": false, "desc": descriptions[1]},
            "blue": {"words": answers["blue"], "solved": false, "desc": descriptions[2]},
            "purple": {"words": answers["purple"], "solved": false, "desc": descriptions[3]}};
    const [solvedTracker, setSolvedTracker] = useState(state);
    // console.log(solvedTracker["yellow"]["words"]) ;

    // Given a position, determine if its corresponding category has been solved or not
    function blah(pos) {
        for (let color in solvedTracker) {

        }
    }
    blah(0);

    //TODO:
    // 1) Given a position, determine if it has been solved
    // 2) Given a position, remove it from the solvedTracker
    // 3) Given a color, determine if it has been solved

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
                setSolvedTracker(prevState => {
                    prevState[color]["solved"] = true;
                })
            }
        }
    }

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
            <SolvedDisplay words={words[0]} title={descriptions[0]} color={"yellow"} visible={true}
                           id={0}/>
            <SolvedDisplay words={words[1]} title={descriptions[1]} color={"green"} visible={true}
                           id={1}/>
            <SolvedDisplay words={words[2]} title={descriptions[2]} color={"blue"} visible={true}
                           id={2}/>
            <SolvedDisplay words={words[3]} title={descriptions[3]} color={"purple"} visible={true}
                           id={3}/>
            <div className={"word-grid puzzle-grid"}>
                {[...positions.keys()].map(pos => (
                    <WordSquare key={pos} text={positions.get(pos)}
                                position={pos}
                                isSelected={selected.has(pos)}
                                onClickProp={handleSelect}
                                visible={!(new Set(Object.values(answers)).has(pos))}/>
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
