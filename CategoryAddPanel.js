import {useState} from "react";
//TODO: if user presses enter while typing in stuff, send an error message (don't erase all)
export default function CategoryAddPanel({wordInput, setUserInput, descInput, setDescInput, color}) {

    return (
        // fancy string formatting stuff
        <div className={`${color} input-panel`}>
            <form>
                <label> Answers (Comma-separated) {" "}
                    <input type={"text"} value={wordInput.toUpperCase()}
                           onChange={event => {
                               setUserInput(event.target.value)
                           }}>
                    </input>
                </label>
            </form>
            <form>
                <label>Description {" "}
                    <input type="text" value={descInput.toUpperCase()}
                           onChange={event => {
                               setDescInput(event.target.value)
                           }}/></label>
            </form>
        </div>
    )
}