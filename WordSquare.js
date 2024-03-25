import {useState} from "react";

export default function WordSquare({text}) {
    return (
        <button className={"square"}>
            {text}
        </button>
    )
}