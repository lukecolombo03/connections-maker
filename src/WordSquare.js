import {useState} from "react";

export default function WordSquare({text, isSelected, onClickProp}) {


    if (isSelected) {
        return (
            <button className={`square selected`} onClick={onClickProp}>
                {text}
            </button>
        )
    } else {
        return (
            <button className={"square"} onClick={onClickProp}>
                {text}
            </button>
        )
    }

}