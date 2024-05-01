import Mistakes from "./Mistakes";
import React from "react";

export default function PuzzleBottom({readyToDeselect, handleDeselect, readyToSubmit, handleSubmit,
                                         mistakes, visible}) {
    if (visible) {
        return (
            <div className={"puzzle-bottom"}>
                <Mistakes count={mistakes}/>
                <div className={"bottom-buttons"}>
                    <button className={"puzzle-button"}>Shuffle</button>
                    <button disabled={!readyToDeselect} onClick={handleDeselect}
                            className={"puzzle-button deselect"}>Deselect All
                    </button>
                    <button disabled={!readyToSubmit} onClick={handleSubmit}
                            className={"puzzle-button submit"}>Submit
                    </button>
                </div>
            </div>
        )
    }
}