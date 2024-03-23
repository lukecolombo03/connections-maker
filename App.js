import './App.css';
import {useState} from "react";
import CategoryAddPanel from "./CategoryAddPanel";
import Square from "./Square";

function App() {
    const [yellowInput, setYellowInput] = useState("");
    const [greenInput, setGreenInput] = useState("");
    const [blueInput, setBlueInput] = useState("");
    const [purpleInput, setPurpleInput] = useState("");

    // pares user's input so the commas separate it into 4 words
    // color param should be one of the state variables
    function parseInput(color) {
        let splitText = ["", "", "", ""];
        // splits user input by comma, maps it to uppercase
        splitText = color.split(",").map(word => word.toUpperCase());
        return splitText;
    }

    return (
        <div>
            <h1 className={"title"}>Create a Puzzle</h1>
            <div className={"main-div"}>
                <div className={"word-add"}>
                    <CategoryAddPanel
                    userInput={yellowInput} setUserInput={setYellowInput} color={"yellow"}/>
                    <CategoryAddPanel
                        userInput={greenInput} setUserInput={setGreenInput} color={"yellow"}/>
                    <CategoryAddPanel
                        userInput={blueInput} setUserInput={setGreenInput} color={"yellow"}/>
                    <CategoryAddPanel
                        userInput={purpleInput} setUserInput={setPurpleInput} color={"yellow"}/>
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
        </div>
    );
}

export default App;
