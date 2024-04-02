import {useState} from "react";
//TODO: if user presses enter while typing in stuff, send an error message (don't erase all)
//TODO: have the input box be on the line below the label text
export default function UserInputPanel({wordInput, setUserInput, descInput, setDescInput, color}) {

    return (
        // fancy string formatting stuff (called literals I think)
        <div className={`${color} input-panel`}>
            <form>
                <label> Answers (Comma-separated) {" "}
                    <input type={"text"} value={wordInput}
                           onChange={event => {
                               setUserInput(event.target.value.trim().toUpperCase())
                           }}>
                    </input>
                </label>
            </form>
            <form>
                <label>Description {" "}
                    <input type="text" value={descInput}
                           onChange={event => {
                               setDescInput(event.target.value.trim().toUpperCase())
                           }}/></label>
            </form>
        </div>
    )
}