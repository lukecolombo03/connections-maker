export default function SolvedDisplay({title, words, color}) {

    //TODO: remove the comma from the last word
    return (
        <div className={`solved-display ${color}`}>
            <h4>{title}</h4>
            <div className={"solved-words"}>{words.map((word, index) => (
                <span key={index}>{word}{", "}</span>
            ))}</div>
        </div>
    )
}