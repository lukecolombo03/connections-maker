import {useState} from "react";

/**
 * Represents one of 16 squares that has a word in it
 * @param text
 * @param position
 * @param isSelected
 * @param onClickProp
 * @param visible
 * @returns {JSX.Element}
 * @constructor
 */
export default function WordSquare({text, position, isSelected, onClickProp, visible}) {
    const onClick = () => {
        onClickProp(position);
    }

    if (isSelected) {
        return (
            <button className={"square selected"} onClick={onClick}>
                {text}
            </button>
        )
    } else if (visible) {
        return (
            <button className={"square"} onClick={onClick}>
                {text}
            </button>
        )
    }

}