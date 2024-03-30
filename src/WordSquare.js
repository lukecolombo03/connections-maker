import {useState} from "react";

export default function WordSquare({text, position, isSelected, onClickProp}) {
    const onClick = () => {
        onClickProp(position);
    }

    if (isSelected) {
        return (
            <button className={`square selected`} onClick={onClick}>
                {text}
            </button>
        )
    } else {
        return (
            <button className={"square"} onClick={onClick}>
                {text}
            </button>
        )
    }

}