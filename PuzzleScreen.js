import {useState} from "react";
import WordSquare from "./WordSquare";

export default function PuzzleScreen({words, title, author, descriptions, answers}) {
    console.log("Puzzle screen: ", words, descriptions);

    const [selected, setSelected] = useState(Array(4));

    //TODO:
    // 1) use map to make it more efficient to generate WordSquares
    // 2) make each square highlight when you select it (but max of 4)

    return (
        <div className={"puzzle-container"}>
            <div className={"word-grid"}>
                {/*{words.map((category, i) => (*/}
                {/*    <div id={i}>*/}
                {/*        {category.map((word, j) => (*/}
                {/*                <div key={j} className={"row"}>*/}
                {/*                    <WordSquare text={word}/>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*    </div>*/}
                {/*    ))}*/}
                <div className={"row"}>
                    <WordSquare text={words[0][0]}/>
                    <WordSquare text={words[0][1]}/>
                    <WordSquare text={words[0][2]}/>
                    <WordSquare text={words[0][3]}/>
                </div>
                <div className={"row"}>
                    <WordSquare text={words[1][0]}/>
                    <WordSquare text={words[1][1]}/>
                    <WordSquare text={words[1][2]}/>
                    <WordSquare text={words[1][3]}/>
                </div>
                <div className={"row"}>
                    <WordSquare text={words[2][0]}/>
                    <WordSquare text={words[2][1]}/>
                    <WordSquare text={words[2][2]}/>
                    <WordSquare text={words[2][3]}/>
                </div>
                <div className={"row"}>
                    <WordSquare text={words[3][0]}/>
                    <WordSquare text={words[3][1]}/>
                    <WordSquare text={words[3][2]}/>
                    <WordSquare text={words[3][3]}/>
                </div>
            </div>

        </div>

    )
}
