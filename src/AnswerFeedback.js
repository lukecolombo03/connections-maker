//flag is 0 for one away
//flag is 1 for already guessed
//only appear (return stuff) if prop show is true
export default function AnswerFeedback({flag, show}) {
    let text;
    if (flag === 0) {
        text = "One away...";
    }
    if (flag === 1) {
        text = "Already guessed!";
    }

    if (show) {
        return (
            <div className={"answer-feedback"}>
                {text}
            </div>
        )
    }
}