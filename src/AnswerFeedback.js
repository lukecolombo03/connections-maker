//flag is 0 for one away
//flag is 1 for already guessed
//only appear (return stuff) if prop show is true
export default function AnswerFeedback({flag, show}) {
    const text = (flag === 0) ? "One away..." : "Already guessed!"

    if (show) {
        return (
            <div>
                {text}
            </div>
        )
    }
}