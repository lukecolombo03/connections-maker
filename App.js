import './App.css';
import {useState} from "react";
import CategoryAddPanel from "./CategoryAddPanel";
import Square from "./Square";
import PuzzleScreen from "./PuzzleScreen";

function App() {
    const [yellowInput, setYellowInput] = useState("");
    const [greenInput, setGreenInput] = useState("");
    const [blueInput, setBlueInput] = useState("");
    const [purpleInput, setPurpleInput] = useState("");

    // a list of lists, each inner list is all of the words for a category (yellow, blue, etc)
    let allWords = [yellowInput, greenInput, blueInput, purpleInput].map(
        innerList => parseInput(innerList));

    const [yellowDesc, setYellowDesc] = useState("");
    const [greenDesc, setGreenDesc] = useState("");
    const [blueDesc, setBlueDesc] = useState("");
    const [purpleDesc, setPurpleDesc] = useState("");

    //which screen is to be displayed: create screen or puzzle screen
    const [screen, setScreen] = useState(0);

    // pares user's input so the commas separate it into 4 words
    // color param should be one of the state variables
    function parseInput(color) {
        // splits user input by comma, maps it to uppercase
        let splitText = color.split(",").map(word => word.toUpperCase());
        return splitText;
    }

    //checks all information to make sure its ok to generate a puzzle
    function prepareForGenerate() {
        let allDescs = [yellowDesc, greenDesc, blueDesc, purpleDesc];
        console.log(allDescs);
        //check descriptions are all there
        for (let i = 0; i < 4; i++) {
            if (allDescs[i] == "") {
                alert("Error: please enter a description");
                break;
            }
        }
        console.log(allWords);
        //check there's exactly 4 words in each category
        for (let category of allWords) {
            if (category.length !== 4) {
                alert("Error: need four words in each category");
                break;
            }
        }
    }

    //TODO: make sure rows of CategoryAddPanels and Squares line up
    return (
        <div>
            <h1 className={"title"}>Create a Puzzle</h1>
            <div className={"main-div"}>
                <div className={"word-add"}>
                    <CategoryAddPanel
                        wordInput={yellowInput} setUserInput={setYellowInput} descInput={yellowDesc}
                        setDescInput={setYellowDesc} color={"yellow"}/>
                    <CategoryAddPanel
                        wordInput={greenInput} setUserInput={setGreenInput} descInput={greenDesc}
                        setDescInput={setGreenDesc} color={"green"}/>
                    <CategoryAddPanel
                        wordInput={blueInput} setUserInput={setBlueInput} descInput={blueDesc}
                        setDescInput={setBlueDesc} color={"blue"}/>
                    <CategoryAddPanel
                        wordInput={purpleInput} setUserInput={setPurpleInput} descInput={purpleDesc}
                        setDescInput={setPurpleDesc} color={"purple"}/>
                </div>
                <div className={"word-grid"}>
                    <div className={"row"}>
                        <Square value={parseInput(yellowInput)[0]}/>
                        <Square value={parseInput(yellowInput)[1]}/>
                        <Square value={parseInput(yellowInput)[2]}/>
                        <Square value={parseInput(yellowInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <Square value={parseInput(greenInput)[0]}/>
                        <Square value={parseInput(greenInput)[1]}/>
                        <Square value={parseInput(greenInput)[2]}/>
                        <Square value={parseInput(greenInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <Square value={parseInput(blueInput)[0]}/>
                        <Square value={parseInput(blueInput)[1]}/>
                        <Square value={parseInput(blueInput)[2]}/>
                        <Square value={parseInput(blueInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <Square value={parseInput(purpleInput)[0]}/>
                        <Square value={parseInput(purpleInput)[1]}/>
                        <Square value={parseInput(purpleInput)[2]}/>
                        <Square value={parseInput(purpleInput)[3]}/>
                    </div>
                </div>
            </div>
            <button>Shuffle: (todo)</button>
            <button onClick={() => prepareForGenerate()}>Generate:</button>
        </div>
    );
}

export default App;
