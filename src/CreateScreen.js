import React, {useState} from "react";
import UserInputPanel from "./UserInputPanel";
import WordSquare from "./WordSquare";
//TODO: make sure rows of CategoryAddPanels and Squares line up
//TODO: let users drag squares around to rearrange them
export default function CreateScreen({
                                         yellowInput,
                                         setYellowInput,
                                         yellowDesc,
                                         setYellowDesc,
                                         greenInput,
                                         setGreenInput,
                                         greenDesc,
                                         setGreenDesc,
                                         blueInput,
                                         setBlueInput,
                                         blueDesc,
                                         setBlueDesc,
                                         purpleInput,
                                         setPurpleInput,
                                         purpleDesc,
                                         setPurpleDesc,
                                         setScreen,
                                         allWords,
                                         parseInput,
                                         mistakes,
                                         setMistakes
                                     }) {

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
        prepareForGenerate(true);
    }

    return (
        <div>
            <h1 className={"title"}>Create a Puzzle</h1>
            <div className={"main-div"}>
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
                    <form>
                        <label>
                            Mistakes allowed: {" "}
                            <input type="number" value={mistakes}
                                   onChange={event => {
                                       setMistakes(event.target.value)
                                   }}/>
                        </label>
                    </form>
                </div>
                <div className={"word-grid"}>
                    {/*Note: tried to make this fewer lines using map but parseInput(yellowInput) is
                    variable length so it's tricky*/}
                    <div className={"row"}>
                        <WordSquare text={parseInput(yellowInput)[0]}/>
                        <WordSquare text={parseInput(yellowInput)[1]}/>
                        <WordSquare text={parseInput(yellowInput)[2]}/>
                        <WordSquare text={parseInput(yellowInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <WordSquare text={parseInput(greenInput)[0]}/>
                        <WordSquare text={parseInput(greenInput)[1]}/>
                        <WordSquare text={parseInput(greenInput)[2]}/>
                        <WordSquare text={parseInput(greenInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <WordSquare text={parseInput(blueInput)[0]}/>
                        <WordSquare text={parseInput(blueInput)[1]}/>
                        <WordSquare text={parseInput(blueInput)[2]}/>
                        <WordSquare text={parseInput(blueInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <WordSquare text={parseInput(purpleInput)[0]}/>
                        <WordSquare text={parseInput(purpleInput)[1]}/>
                        <WordSquare text={parseInput(purpleInput)[2]}/>
                        <WordSquare text={parseInput(purpleInput)[3]}/>
                    </div>
                </div>
            </div>
            <button>Shuffle: (todo)</button>
            <button onClick={() => prepareForGenerate()}>Generate:</button>
            <button onClick={() => autofill()}>For Luke: click here to autofill + generate</button>
        </div>
    )
}