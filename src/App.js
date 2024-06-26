import './App.css';
import {useState} from "react";
import PuzzleScreen from "./PuzzleScreen";
import CreateScreen from "./CreateScreen";

function App() {
    const [yellowInput, setYellowInput] = useState("");
    const [greenInput, setGreenInput] = useState("");
    const [blueInput, setBlueInput] = useState("");
    const [purpleInput, setPurpleInput] = useState("");

    // a list of lists, each inner list is all the words for a category (yellow, blue, etc)
    let allWords = [yellowInput, greenInput, blueInput, purpleInput].map(
        innerList => parseInput(innerList));

    // parse user's input so the commas separate it into 4 words
    // color param should be one of the state variables
    function parseInput(color) {
        // splits user input by comma, maps it to uppercase
        return color.split(",").map(word => word.toUpperCase());
    }

    const [yellowDesc, setYellowDesc] = useState("");
    const [greenDesc, setGreenDesc] = useState("");
    const [blueDesc, setBlueDesc] = useState("");
    const [purpleDesc, setPurpleDesc] = useState("");

    //which screen is to be displayed: create screen or puzzle screen
    const [screen, setScreen] = useState(0);

    //How many mistakes the user has. If undefined, they have unlimited mistakes.
    const [mistakes, setMistakes] = useState(undefined);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");


    // Track the words (as indices), description, and status (solved/not) for each color
    const [answers, setAnswers] = useState({"yellow": null, "green": null,
                                               "blue": null, "purple": null});

    let content;
    if (screen === 0) {
        content = <CreateScreen yellowInput={yellowInput} setYellowInput={setYellowInput}
                                greenInput={greenInput} setGreenInput={setGreenInput}
                                blueInput={blueInput} setBlueInput={setBlueInput}
                                purpleInput={purpleInput} setPurpleInput={setPurpleInput}
                                yellowDesc={yellowDesc} setYellowDesc={setYellowDesc}
                                greenDesc={greenDesc} setGreenDesc={setGreenDesc}
                                blueDesc={blueDesc} setBlueDesc={setBlueDesc}
                                purpleDesc={purpleDesc} setPurpleDesc={setPurpleDesc}
                                setScreen={setScreen} allWords={allWords} parseInput={parseInput}
                                mistakes={mistakes} setMistakes={setMistakes}
                                title={title} author={author} setTitle={setTitle}
                                setAuthor={setAuthor} answers={answers} setAnswers={setAnswers}/>
    }
    if (screen === 1) {
        content = <PuzzleScreen words={allWords}
                                mistakes={mistakes} setMistakes={setMistakes} title={title}
                                author={author} answers={answers}/>
    }

    return (
        <div className={"app-cont"}>
            {content}
        </div>

    );
}

export default App;
