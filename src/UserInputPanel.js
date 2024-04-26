import {useState} from "react";
//TODO: if user presses enter while typing in stuff, send an error message (don't erase all)
//TODO: have the input box be on the line below the label text
export default function UserInputPanel({wordInput, setUserInput, descInput, setDescInput, color}) {

    return (
        // fancy string formatting stuff (called literals I think)
        <div className={`${color} input-panel`}>
            <form>
                <h3>Title</h3>
                <label className={"label"}>
                    <input className={"title-label"} type="text" value={descInput}
                           onChange={event => {
                               setDescInput(event.target.value.trim().toUpperCase())
                           }}/></label>
            </form>
            <form>
                <h3>Answers (Comma separated)</h3>
                <label>
                    <input className={"item-label"} type={"text"} value={wordInput}
                           onChange={event => {
                               setUserInput(event.target.value.trim().toUpperCase())
                           }}>
                    </input>
                </label>
            </form>
        </div>
    )
}