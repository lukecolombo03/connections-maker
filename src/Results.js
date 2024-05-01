// 'result' is a flag, 0 meaning user won, 1 meaning they lost
export default function Results({result, author, pastGuesses}) {
    let title;
    if (result === 0) {
        title = "Great!"
    }
    else if (result === 1) {
        title = "Next time..."
    }
    const subtitle = "Custom Connections made by" + author;
    return (
        <div>
            {/*TODO: put an 'X' icon in this button*/}
            <button>Back to puzzle</button>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <button>Share Your Results</button>
            <button>Make Another Puzzle</button>
        </div>
    )
}