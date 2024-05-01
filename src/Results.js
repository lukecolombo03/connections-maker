import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faX} from '@fortawesome/free-solid-svg-icons'
// 'result' is a flag, 0 meaning user won, 1 meaning they lost
export default function Results({visible, result, author, pastGuesses, setVisible}) {
    let title;
    if (result === 0) {
        title = "Great!"
    } else if (result === 1) {
        title = "Next Time!"
    }
    // console.log(pastGuesses);
    const subtitle = "Custom Connections made by " + author;

    function handleClick() {
        setVisible(false);
    }

    if (visible) {
        return (
            <div className={"results-cont"}>
                {/*TODO: put an 'X' icon in this button*/}
                <button className={"back-to-puzzle"} onClick={() => handleClick()}>
                    {<FontAwesomeIcon icon={faX} className={"x-button"}/>}</button>
                <h3 className={"results-title"}>{title}</h3>
                <h4 className={"results-subtitle"}>{subtitle}</h4>
                <div className={"results-buttons"}>
                    <button className={"result-button"}>Share Your Results</button>
                    <button className={"result-button new-puzzle-button"}>Make Another Puzzle</button>
                </div>
            </div>
        )
    }

}