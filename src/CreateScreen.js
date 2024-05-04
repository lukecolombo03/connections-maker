import React, {useState} from "react";
import UserInputPanel from "./UserInputPanel";
import WordSquare from "./WordSquare";
import CreateForms from "./CreateForms";
//TODO: let users drag squares around to rearrange them
export default function CreateScreen({
                                         yellowInput, setYellowInput, yellowDesc, setYellowDesc,
                                         greenInput, setGreenInput, greenDesc, setGreenDesc,
                                         blueInput, setBlueInput, blueDesc, setBlueDesc,
                                         purpleInput, setPurpleInput, purpleDesc, setPurpleDesc,
                                         setScreen, allWords, parseInput, mistakes, setMistakes,
                                         title, setTitle, author, setAuthor, answers, setAnswers
                                     }) {
    //(Key, value) = (Int, String)
    //Represents each position (one of sixteen indices) and its corresponding word
    const wordMap = new Map();

    // Updates the word map every time the user types in a new word
    function updateWordMap() {
        let count = 0;
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

    //Make the keys the descriptions, the values the answers (as positions from the keys of wordMap)
    function updateAnswers() {
        const nextAnswers = {
            "yellow": {"words": [...wordMap.keys()].slice(0, 4), "solved": false, "desc": yellowDesc},
            "green": {"words": [...wordMap.keys()].slice(4, 8), "solved": false, "desc": greenDesc},
            "blue": {"words": [...wordMap.keys()].slice(8, 12), "solved": false, "desc": blueDesc},
            "purple": {"words": [...wordMap.keys()].slice(12, 16), "solved": false, "desc": purpleDesc}
        };
        setAnswers(nextAnswers);
    }

    //checks all information to make sure it's ok to generate a puzzle
    //made a no error flag so I could just click one button to test PuzzleScreen
    function prepareForGenerate(noErrorFlag = false) {
        let allDescs = [yellowDesc, greenDesc, blueDesc, purpleDesc];
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
        const nextAnswers = {
            "yellow": {"words": [0, 1, 2, 3], "solved": false, "desc": "yellow category"},
            "green": {"words": [4, 5, 6, 7], "solved": false, "desc": "green category"},
            "blue": {"words": [8, 9, 10, 11], "solved": false, "desc": "blue category"},
            "purple": {"words": [12, 13, 14, 15], "solved": false, "desc": "purple category"}
        };
        setYellowInput("a,b,c,d");
        setGreenInput("e,f,g,h");
        setBlueInput("i,j,k,l");
        setPurpleInput("m,n,o,p");
        setAnswers(nextAnswers);
        setMistakes(4);
        setTitle("What is this, puzzle city?");
        setAuthor("Your mom");
        setScreen(1);
    }

    // The array of WordSquares that will be rendered
    const [arrayToRender, setArrayToRender] = useState([...wordMap.values()]);

    // Shuffles the given array
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    function shuffleWords() {
        setArrayToRender(shuffle([...arrayToRender]));
    }

    return (
        <div>
            <h1 className={"title"}>Create a Puzzle</h1>
            <div className={"create-cont"}>
                <div className={"word-add"}>
                    <CreateForms mistakes={mistakes} setMistakes={setMistakes} title={title}
                                 setTitle={setTitle} author={author} setAuthor={setAuthor}/>
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
                </div>
                <div className={"word-grid-cont"}>
                    <p className={"drag-text"}>Drag squares around to rearrange, or click the
                        shuffle button</p>
                    <div className={"word-grid"}>
                        {arrayToRender.map(
                            (val, i) => (<WordSquare key={i} text={val} visible={true}
                                                     onClickProp={() => null}/>))}
                    </div>
                    <div className={"grid-bottom"}>
                        <button onClick={() => shuffleWords()} className={"shuffle-button"}>Shuffle
                        </button>
                        <button onClick={() => prepareForGenerate()}
                                className={"generate-button"}>Generate Puzzle
                        </button>
                    </div>
                </div>
            </div>
            <button onClick={() => autofill()}>For Luke: click here to autofill + generate</button>
        </div>
    )
}