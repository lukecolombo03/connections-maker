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
    // console.log(words, descriptions, answers);
    /**
     * Position map: every square index (position) has an associated word, and a status (visible or not)
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
     * The positions of all squares that have already been solved (removed from board)
     */
    const [solved, setSolved] = useState(new Set());

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


    // Helper function for handleSubmit()
    // Compares two arrays and returns true if every element of B is in A
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
     * Whether the answer feedback should be visible
     */
    const [visible, setVisible] = useState(true);

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
            // Handle correct guess
            //TODO: give user feedback when they get an answer correct
                // 1: Compare guess to list of answers to figure out which category this is for
                // (need mapping of answer list to category)
                // 2: Send child the category color, name, and words
                // Need to link the positions to
            else {
                console.log("Correct!");
                for (let item of guess) {
                    setSolved(prevState => prevState.add(item));
                }
                console.log(answers.yellow.some(item => {
                    return compareArrays(item, guess);
                }))
            }
        }
        //deselect all
        setSelected(new Set());
    }

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
            // console.log("After\t", nextSelected);
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
            <SolvedDisplay words={words} title={descriptions[0]} color={"blue"}/>
            <div className={"word-grid puzzle-grid"}>
                {[...positions.keys()].map(pos => (
                    <WordSquare key={pos} text={positions.get(pos)}
                                position={pos}
                                isSelected={selected.has(pos)}
                                onClickProp={handleSelect}
                                visible={!solved.has(pos)}/>
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
