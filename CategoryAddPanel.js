import {useState} from "react";
export default function CategoryAddPanel({userInput, setUserInput}) {

    return (
        <form >
            <label> Answers (comma separated): {" "}
                <input type={"text"} value={userInput.toUpperCase()}
                       onChange={event =>
                       {setUserInput(event.target.value)}}>
                </input>
            </label>
        </form>
    )
}