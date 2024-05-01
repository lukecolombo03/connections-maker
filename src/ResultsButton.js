import React from "react";

export default function ResultsButton({selfVisible, setResultsVisible}) {

    function handleClick() {
        setResultsVisible(true);
    }

    if (selfVisible) {
        return (
            <button className={"view-results-button"} onClick={() => handleClick()}>View Results</button>
        )
    }
}