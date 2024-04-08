import React, {useState} from "react";
import UserInputPanel from "./UserInputPanel";
import WordSquare from "./WordSquare";
import CreateForms from "./CreateForms";
//TODO: make sure rows of CategoryAddPanels and Squares line up
//TODO: let users drag squares around to rearrange them
export default function CreateScreen({
                                         yellowInput, setYellowInput, yellowDesc, setYellowDesc,
                                         greenInput, setGreenInput, greenDesc, setGreenDesc,
                                         blueInput, setBlueInput, blueDesc, setBlueDesc,
                                         purpleInput, setPurpleInput, purpleDesc, setPurpleDesc,
                                         setScreen, allWords, parseInput, mistakes, setMistakes,
                                         title, setTitle, author, setAuthor, answers, setAnswers
                                     }) {
    //TODO: have a map of (int, String), representing positions and their corresponding words.
    // Pass to PuzzleScreen a map of (String, List<int>) representing the categories and the
    // correct words (as positions) in them.
    // To check answer correctness, compare 'selected' (set of indices) to this map.
    //first four should be parseInput(yellowInput)[0,4]

    const wordMap = new Map();
    let count = 0;

    function updateWordMap() {
        while (count < 16) {
            if (count < 4) {
                wordMap.set(count, parseInput(yellowInput)[count]);
            } else if (count < 8) {
                wordMap.set(count, parseInput(greenInput)[count - 4]);
            } else if (count < 12) {
                wordMap.set(count, parseInput(blueInput)[count - 8]);
            } else if (count < 16) {
                wordMap.set(count, parseInput(purpleInput)[count - 12]);
            }
            count++;
        }
    }

    updateWordMap();

    // console.log("Word map:\t", wordMap, [...wordMap.values()]);

    //make the keys the descriptions, the values the answers (as positions from the keys of wordMap)
    function updateAnswers() {
        const nextAnswers = {...answers};
        nextAnswers.yellow = [...wordMap.keys()].slice(0, 4);
        nextAnswers.green = [...wordMap.keys()].slice(4, 8);
        nextAnswers.blue = [...wordMap.keys()].slice(8, 12);
        nextAnswers.purple = [...wordMap.keys()].slice(12, 16);
        //This doesn't update it right away but does update it by the time it's passed to
        // PuzzleScreen. No clue why
        setAnswers(nextAnswers);
        // console.log(nextAnswers);
    }

    //checks all information to make sure it's ok to generate a puzzle
    //made a no error flag so I could just click one button to test PuzzleScreen
    function prepareForGenerate(noErrorFlag = false) {
        let allDescs = [yellowDesc, greenDesc, blueDesc, purpleDesc];
        // console.log(allDescs);
        let error = false;
        if (!noErrorFlag) {
            // is there an error?
            //check descriptions are all there
            for (let i = 0; i < 4; i++) {
                if (allDescs[i] === "") {
                    alert("Error: please enter a description");
                    error = true;
                    break;
                }
            }
            // console.log(allWords);
            //check there's exactly 4 words in each category
            for (let category of allWords) {
                if (category.length !== 4) {
                    alert("Error: need four words in each category");
                    error = true;
                    break;
                }
            }
        }
        //if no errors, tell App to change the screen to PuzzleScreen, pass the answers map
        if (!error) {
            updateAnswers();
            setScreen(1);
        }
    }

    //making it easier to test PuzzleScreen
    function autofill() {
        setYellowInput("a,b,c,d");
        setGreenInput("e,f,g,h");
        setBlueInput("i,j,k,l");
        setPurpleInput("m,n,o,p");
        setYellowDesc("first");
        setGreenDesc("second");
        setBlueDesc("third");
        setPurpleDesc("fourth");
        setScreen(1);
        setMistakes(4);
        setTitle("What is this, puzzle city?");
        setAuthor("Your mom");
        prepareForGenerate(true);
        setAnswers({
                       yellow: [0, 1, 2, 3],
                       green: [4, 5, 6, 7],
                       blue: [8, 9, 10, 11],
                       purple: [12, 13, 14, 15]
                   });
    }
    //TODO: shuffle this less... it's going crazy rn
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    let arrayToRender = shuffle([...wordMap.values()]);

    //TODO: make this call the parent to ask for re-render - have to use state somehow I think
    function shuffleWords() {
        arrayToRender = shuffle([...arrayToRender]);
    }

    return (
        <div>
            <h1 className={"title"}>Create a Puzzle</h1>
            <div className={"create-cont"}>
                <div className={"word-add"}>
                    <UserInputPanel
                        wordInput={yellowInput} setUserInput={setYellowInput} descInput={yellowDesc}
                        setDescInput={setYellowDesc} color={"yellow"}/>
                    <UserInputPanel
                        wordInput={greenInput} setUserInput={setGreenInput} descInput={greenDesc}
                        setDescInput={setGreenDesc} color={"green"}/>
                    <UserInputPanel
                        wordInput={blueInput} setUserInput={setBlueInput} descInput={blueDesc}
                        setDescInput={setBlueDesc} color={"blue"}/>
                    <UserInputPanel
                        wordInput={purpleInput} setUserInput={setPurpleInput} descInput={purpleDesc}
                        setDescInput={setPurpleDesc} color={"purple"}/>
                    <CreateForms mistakes={mistakes} setMistakes={setMistakes} title={title}
                                 setTitle={setTitle} author={author} setAuthor={setAuthor}/>
                </div>
                <div className={"word-grid"}>
                    {arrayToRender.map((val, i) => (<WordSquare key={i} text={val}/>))}
                </div>
            </div>
            <button onClick={() => shuffleWords()}>Shuffle: {" "}</button>
            <button onClick={() => prepareForGenerate()}>Generate:</button>
            <button onClick={() => autofill()}>For Luke: click here to autofill + generate</button>
        </div>
    )
}