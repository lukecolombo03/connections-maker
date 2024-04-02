import React, {useState} from "react";
import WordSquare from "./WordSquare";
import Mistakes from "./Mistakes";
import AnswerFeedback from "./AnswerFeedback";
//TODO: do positioning in CreateScreen, pass that here
//NOTE: WORDS AREN'T NECESSARILY UNIQUE
export default function PuzzleScreen({words, title, author, descriptions, mistakes, setMistakes}) {
    // console.log(words, author, title, descriptions, mistakes);
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
    console.log(positions);

    /**
     * Selected set: the positions of all squares that are selected (highlighted)
     */
    const [selected, setSelected] = useState(new Set());

    /**
     * Answers map (category and its associated words + description)
     * (Key, Val) = (category, wordListAndDescription)
     * Note: hardcoding it to be the basic 4 colors, could change in the future
     * @type {{green: *, blue: *, yellow: *, purple: *}}
     */
    const answersMap = {
        "yellow": words[0].concat(descriptions[0]),
        "green": words[1].concat(descriptions[1]), "blue": words[2].concat(descriptions[2]),
        "purple": words[3].concat(descriptions[3])
    };
    const [answers, setAnswers] = useState(answersMap);
    console.log(answers);

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

    function handleSubmit() {
        //check if guess is right or wrong
        const all_answers = [...Object.values(answers).map(list => list.slice(0,4))];
        //TODO: selected is indices instead of words, need to map all_answers to indices so they match
        let correct = (selected in all_answers);
        console.log("ALL ANSWERS", all_answers, selected, (selected in all_answers));
        //give user feedback if it's wrong
        if (!correct) {
            setShowFeedback(true);
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
                            className={"puzzle-button"}>Deselect all</button>
                    <button disabled={!readyToSubmit} onClick={handleSubmit}
                            className={`puzzle-button submit-button`}>Submit</button>
                </div>
            </div>
        </div>
    )
}
