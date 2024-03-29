import {useState} from "react";
import WordSquare from "./WordSquare";
//TODO: do positioning in CreateScreen, pass that here
//NOTE: WORDS AREN'T NECESSARILY UNIQUE
export default function PuzzleScreen({words, title, author, descriptions}) {
    // console.log("Puzzle screen: ", words, descriptions);
    const wordsFlattened = [].concat(...words);
    // console.log("Words flattened:", wordsFlattened);

    //Position map: every square index (position) has an associated word
    //(Key, Val) = (position, word)
    const positionMap = new Map();
    for (let i = 0; i < wordsFlattened.length; i++) {
        positionMap.set(i, wordsFlattened[i]);
    }
    const [positions, setPositions] = useState(positionMap);
    console.log("position map\t", positions);
    console.log("test\t", [...positions.keys()])

    //Selected map: each position is either selected or not
    //(Key, Val) = (position, isSelected)
    const selectedSet = new Set();
    const [selected, setSelected] = useState(selectedSet);
    const [selected2, setSelected2] = useState(0);

    //Answers map (category and its associated words + description)
    //(Key, Val) = (category, wordListAndDescription)
    //Note: hardcoding it to be the basic 4 colors, could change in the future
    const answersMap = {
        "yellow": words[0].concat(descriptions[0]),
        "green": words[1].concat(descriptions[1]), "blue": words[2].concat(descriptions[2]),
        "purple": words[3].concat(descriptions[3])
    };
    const [answers, setAnswers] = useState(answersMap);

    // console.log("answers map\t", answers);

    function getAllSelected() {
        let return_list = [];
        for (const item of Object.keys(selected)) {
            if (selected[item] === true) {
                return_list.push(item);
            }
        }
        return return_list;
    }

    // console.log("TEST\t", getAllSelected());

    function handleSelect(value) {
        console.log("Before\t", selected);
        let nextSelected = selected;
        // if already selected, unselect, else, select if there's not already 4 selected
        if (nextSelected.has(value)) {
            nextSelected.delete(value);
        } else {
            if (nextSelected.size < 4) {
                nextSelected.add(value);
            }
        }
        setSelected(nextSelected);
        console.log("After\t", selected);
    }

    function handleSelect2(value) {
        setSelected2(value);
    }


    //TODO:
    // limit amount of words selected to be 4 (and track those 4 words)

    return (
        <div className={"puzzle-container"}>
            <div className={"word-grid"}>
                {console.log("selected map\t", selected)}
                {[...positions.keys()].map(pos => (
                    <WordSquare key={pos} text={positions.get(pos)}
                                isSelected={selected.has(pos)}
                                onClickProp={() => handleSelect(pos)}/>

                ))}
            </div>
        </div>
    )
}
