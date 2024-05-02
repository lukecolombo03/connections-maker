
// Represents one of the 16 squares for the game board
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