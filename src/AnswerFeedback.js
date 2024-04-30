
import {useState} from "react";
import {useEffect} from "react";
//flag is 0 for one away
//flag is 1 for already guessed
//only appear (return stuff) if prop show is true
//TODO: My fix for making it go away was to have a visible state in PuzzleScreen, then pass that
// and `show`, should fix it to make it less repetitive I don't even know how it works
export default function AnswerFeedback({flag, show, visible, setVisible}) {
    // Effect to make the element disappear after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        // Clear the timer when the component unmounts or when visibility changes
        return () => {
            clearTimeout(timer);
        };
    }); // No dependency, want to re-run every time this component is rendered

    let text;
    if (flag === 1) {
        text = "One away...";
    }
    if (flag === 2) {
        text = "Already guessed!";
    }
    if (flag === 3) {
        text = "Solid";
    }

    if (show) {
        return (
            <div>
                {visible && <div className={"answer-feedback"}>{text}</div>}
            </div>

        )
    }
}