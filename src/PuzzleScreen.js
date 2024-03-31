import React, {useState} from "react";
import WordSquare from "./WordSquare";
import Mistakes from "./Mistakes";
import AnswerFeedback from "./AnswerFeedback";
//TODO: do positioning in CreateScreen, pass that here
//NOTE: WORDS AREN'T NECESSARILY UNIQUE
export default function PuzzleScreen({words, title, author, descriptions, mistakes, setMistakes}) {
    //Position map: every square index (position) has an associated word
    //(Key, Val) = (position, word)
    const wordsFlattened = [].concat(...words);
    const positionMap = new Map();
    for (let i = 0; i < wordsFlattened.length; i++) {
        positionMap.set(i, wordsFlattened[i]);
    }
    const [positions, setPositions] = useState(positionMap);

    //Selected set: the positions of all squares that are selected (highlighted)
    const [selected, setSelected] = useState(new Set());

    //Answers map (category and its associated words + description)
    //(Key, Val) = (category, wordListAndDescription)
    //Note: hardcoding it to be the basic 4 colors, could change in the future
    const answersMap = {
        "yellow": words[0].concat(descriptions[0]),
        "green": words[1].concat(descriptions[1]), "blue": words[2].concat(descriptions[2]),
        "purple": words[3].concat(descriptions[3])
    };
    const [answers, setAnswers] = useState(answersMap);

    const [showFeedback, setShowFeedback] = useState(false);
    const [showEndScreen, setShowEndScreen] = useState(false);

    //TODO: learn how to display a component when user clicks a button
    function handleSubmit() {
        //give user feedback if it's wrong
        setShowFeedback(true);
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
            console.log("After\t", nextSelected);
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
        <div className={"puzzle-container"}>
            <AnswerFeedback show={showFeedback}/>
            <div className={"word-grid"}>
                {[...positions.keys()].map(pos => (
                    <WordSquare key={pos} text={positions.get(pos)}
                                position={pos}
                                isSelected={selected.has(pos)}
                                onClickProp={handleSelect}/>

                ))}
            </div>
            <div>
                <Mistakes count={mistakes}/>
                <div className={"bottom-buttons"}>
                    <button>Shuffle</button>
                    <button onClick={handleDeselect}>Deselect all</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}
