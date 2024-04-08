import React, {useState} from "react";
import WordSquare from "./WordSquare";
import Mistakes from "./Mistakes";
import AnswerFeedback from "./AnswerFeedback";
//TODO:
// 1) Shuffle the WordSquares
// 2) Make a shuffle button
// 3) Let users drag squares around to rearrange them
// 4) After correct answer, rearrange those squares, show the description and color, make
// them unclickable
// 5) After incorrect answer, do some animation
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
    // console.log(positions);

    /**
     * Selected set: the positions of all squares that are selected (highlighted)
     */
    const [selected, setSelected] = useState(new Set());

    /**
     * Whether to show various components
     */
    const [showFeedback, setShowFeedback] = useState(false);
    const [showEndScreen, setShowEndScreen] = useState(false);

    /**
     * Whether to make the submit/deselect buttons clickable
     * @type {boolean}
     */
    let readyToSubmit = (selected.size === 4);
    let readyToDeselect = (selected.size > 0);

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

    function handleSubmit() {
        console.log(answers);
        //check if guess is right or wrong
        const all_answers = [...Object.values(answers).map(list => list.slice(0, 4))];
        const selectedList = Array.from(selected);
        let correct = all_answers.some(item => {
            return compareArrays(item, selectedList);
        });
        console.log(correct, all_answers);
        if (!correct) {
            setShowFeedback(true);
            setMistakes(prev => {
                return prev - 1;
            });
        }
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

    //TODO:
    // Have users submit answers, check if they're right or wrong
    // if correct: rearrange squares, change colors
    // if wrong: mistakes--
    //  if one away: display a message
    //  else: do an animation or something

    return (
        <div className={"puzzle-cont"}>
            <div className={"title-cont"}>
                <span className={"title"}>{title}</span>
                <span className={"author"}>{(author !== "" ? "By" : "")} {" "} {author}</span>
            </div>
            <AnswerFeedback show={showFeedback}/>
            <div className={"word-grid"}>
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
