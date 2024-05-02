import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faX} from '@fortawesome/free-solid-svg-icons'
import NoWordSquare from "./NoWordSquare";
// 'result' is a flag, 0 meaning user won, 1 meaning they lost
export default function Results({visible, result, author, pastGuesses, setVisible, indexToColor, compareArrays}) {
    let title;
    if (result === 0) {
        title = "Great!"
    } else if (result === 1) {
        title = "Next Time!"
    }

    const subtitle = "Custom Connections made by " + author;

    function handleClick() {
        setVisible(false);
    }

    // The flattened list of past guesses, to be displayed
    let flattenedGuesses = []
    // Helper list to make sure we don't display duplicate guesses
    let noDuplicateGuesses = []
    for (let guess of [...pastGuesses]) {
        // Make sure this guess isn't already in the array before adding it
        let alreadyInArray = noDuplicateGuesses.some(item => {
            return compareArrays(guess, item);
        });
        // console.log(guess, alreadyInArray);
        if (!alreadyInArray) {
            noDuplicateGuesses.push(guess);
            for (let position of guess){
                flattenedGuesses.push(position);
            }
        }
    }

    // console.log(flattenedGuesses, noDuplicateGuesses, pastGuesses);
    if (visible) {
        return (
            <div>
                <div className={"results-cont"}>
                    <button className={"back-to-puzzle"} onClick={() => handleClick()}>
                        {<FontAwesomeIcon icon={faX} className={"x-button"}/>}</button>
                    <h3 className={"results-title"}>{title}</h3>
                    <h4 className={"results-subtitle"}>{subtitle}</h4>
                    <div className={"result-grid"}>
                        {flattenedGuesses.map((position, index) => (
                            <NoWordSquare color={indexToColor(position)} key={index}/>)
                        )}
                    </div>
                    <div className={"results-buttons"}>
                        <button className={"result-button"}>Share Your Results</button>
                        <button className={"result-button new-puzzle-button"}>Make Another Puzzle
                        </button>
                    </div>
                </div>
            </div>

        )
    }

}