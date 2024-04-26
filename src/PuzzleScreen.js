import React, {useEffect, useState} from "react";
import WordSquare from "./WordSquare";
import Mistakes from "./Mistakes";
import AnswerFeedback from "./AnswerFeedback";
//TODO:
// 1) Shuffle the WordSquares
// 2) Make a shuffle button
// 3) After correct answer, rearrange those squares, show the description and color, make
//    them unclickable
// 4) After incorrect answer, do some animation
// 6) Let users drag squares around to rearrange them
export default function PuzzleScreen({
                                         words, title, author, descriptions, mistakes, setMistakes,
                                         answers, setAnswers
                                     }) {
    /**
     * Position map: every square index (position) has an associated word
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

    //TODO: make sure the sorting part actually works...
    // Helper function for handleSubmit()
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
        a = a.toSorted((one, two) => one === two);
        b = b.toSorted((one, two) => one === two);
        // console.log(a, b);
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    const [visible, setVisible] = useState(true);

    function handleSubmit() {
        // Make variables for the user's guess and all correct answers
        const all_answers = [...Object.values(answers).map(list => list.slice(0, 4))];
        const guess = Array.from(selected);
        // Check if guess is already guessed
        setGuesses([...guesses, guess]);
        let alreadyGuessed = guesses.some(item => {
            return compareArrays(item, guess);
        });
        if (alreadyGuessed) {
            console.log("TRUE");
            setShowFeedback(true);
            setVisible(true);
            setAnswerFeedbackFlag(2);
        }
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
        else {
            console.log("Correct!");
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
            <div className={"puzzle-word-grid"}>
                {[...positions.keys()].map(pos => (
                    <WordSquare key={pos} text={positions.get(pos)}
                                position={pos}
                                isSelected={selected.has(pos)}
                                onClickProp={handleSelect}/>
                ))}
            </div>
            <div className={"puzzle-bottom"}>
                <Mistakes count={mistakes}/>
                <div className={"bottom-buttons"}>
                    <button className={"puzzle-button"}>Shuffle</button>
                    <button disabled={!readyToDeselect} onClick={handleDeselect}
                            className={"puzzle-button"}>Deselect all
                    </button>
                    <button disabled={!readyToSubmit} onClick={handleSubmit}
                            className={`puzzle-button submit-button`}>Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
