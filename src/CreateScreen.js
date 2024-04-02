import React, {useState} from "react";
import UserInputPanel from "./UserInputPanel";
import WordSquare from "./WordSquare";
//TODO: make sure rows of CategoryAddPanels and Squares line up
//TODO: let users drag squares around to rearrange them
export default function CreateScreen({
                                         yellowInput, setYellowInput, yellowDesc, setYellowDesc,
                                         greenInput, setGreenInput, greenDesc, setGreenDesc,
                                         blueInput, setBlueInput, blueDesc, setBlueDesc,
                                         purpleInput, setPurpleInput, purpleDesc, setPurpleDesc,
                                         setScreen, allWords, parseInput, mistakes, setMistakes,
                                         title, setTitle, author, setAuthor
                                     }) {
    //TODO: have a map of (int, String), representing positions and their corresponding words.
    // Pass to PuzzleScreen a map of (String, List<int>) representing the categories and the
    // correct words (as positions) in them.
    // To check answer correctness, compare 'selected' (set of indices) to this map.
    //first four should be parseInput(yellowInput)[0,4]
    const wordMap = new Map();
    let count = 0;
    while (count < 16) {
        if (count < 4) {
            wordMap.set(count, parseInput(yellowInput)[count]);
        }
        else if (count < 8) {
            wordMap.set(count, parseInput(greenInput)[count - 4]);
        }
        else if (count < 12) {
            wordMap.set(count, parseInput(blueInput)[count - 8]);
        }
        else if (count < 16) {
            wordMap.set(count, parseInput(purpleInput)[count - 12]);
        }
        count++;
    }
    console.log(wordMap, [...wordMap.values()]);
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
        //if no errors, tell App to change the screen to PuzzleScreen
        if (!error) {
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
    }
    //TODO: have each WordSquare display its position's word
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
                    {/*TODO: make these three forms their own component, for cleaner code*/}
                    <form>
                        <label>
                            Mistakes allowed: {" "}
                            <input type="number" value={mistakes}
                                   onChange={event => {
                                       setMistakes(event.target.value)
                                   }}/>
                        </label>
                    </form>
                    <form>
                        <label>
                            Title: {" "}
                            <input type="text" value={title}
                                   onChange={event => {
                                       setTitle(event.target.value)
                                   }}/>
                        </label>
                    </form>
                    <form>
                        <label>
                            Author: {" "}
                            <input type="text" value={author}
                                   onChange={event => {
                                       setAuthor(event.target.value)
                                   }}/>
                        </label>
                    </form>
                </div>
                <div className={"word-grid"}>
                    {[...wordMap.values()].map(val => (
                        <WordSquare text={val}/>
                                                )
                    )}
                </div>
            </div>
            <button>Shuffle: (todo)</button>
            <button onClick={() => prepareForGenerate()}>Generate:</button>
            <button onClick={() => autofill()}>For Luke: click here to autofill + generate</button>
        </div>
    )
}