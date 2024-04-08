import React from "react";

export default function CreateForms({mistakes, setMistakes, title, setTitle, author, setAuthor}) {
    return (
        <>
            <form>
                <label>
                    Mistakes allowed: {" "}
                    <input type="number" value={mistakes}
                           onChange={event => {
                               setMistakes(event.target.value)
                           }}/>
                </label>
            </form>
            <form>
                <label>
                    Title: {" "}
                    <input type="text" value={title}
                           onChange={event => {
                               setTitle(event.target.value)
                           }}/>
                </label>
            </form>
            <form>
                <label>
                    Author: {" "}
                    <input type="text" value={author}
                           onChange={event => {
                               setAuthor(event.target.value)
                           }}/>
                </label>
            </form>
        </>

    )
}