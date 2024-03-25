import {useState} from "react";
import CategoryAddPanel from "./CategoryAddPanel";
import Square from "./Square";
export default function CreateScreen({yellowInput, setYellowInput, yellowDesc, setYellowDesc,
                                     greenInput, setGreenInput, greenDesc, setGreenDesc,
                                     blueInput, setBlueInput, blueDesc, setBlueDesc, purpleInput,
                                     setPurpleInput, purpleDesc, setPurpleDesc}) {

    return (
        <div>
            <h1 className={"title"}>Create a Puzzle</h1>
            <div className={"main-div"}>
                <div className={"word-add"}>
                    <CategoryAddPanel
                        wordInput={yellowInput} setUserInput={setYellowInput} descInput={yellowDesc}
                        setDescInput={setYellowDesc}/>
                    <CategoryAddPanel
                        wordInput={greenInput} setUserInput={setGreenInput} descInput={greenDesc}
                        setDescInput={setGreenDesc}/>
                    <CategoryAddPanel
                        wordInput={blueInput} setUserInput={setBlueInput} descInput={blueDesc}
                        setDescInput={setBlueDesc}/>
                    <CategoryAddPanel
                        wordInput={purpleInput} setUserInput={setPurpleInput} descInput={purpleDesc}
                        setDescInput={setPurpleDesc}/>
                </div>
                <div className={"word-grid"}>
                    <div className={"row"}>
                        <Square value={parseInput(yellowInput)[0]}/>
                        <Square value={parseInput(yellowInput)[1]}/>
                        <Square value={parseInput(yellowInput)[2]}/>
                        <Square value={parseInput(yellowInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <Square value={parseInput(greenInput)[0]}/>
                        <Square value={parseInput(greenInput)[1]}/>
                        <Square value={parseInput(greenInput)[2]}/>
                        <Square value={parseInput(greenInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <Square value={parseInput(blueInput)[0]}/>
                        <Square value={parseInput(blueInput)[1]}/>
                        <Square value={parseInput(blueInput)[2]}/>
                        <Square value={parseInput(blueInput)[3]}/>
                    </div>
                    <div className={"row"}>
                        <Square value={parseInput(purpleInput)[0]}/>
                        <Square value={parseInput(purpleInput)[1]}/>
                        <Square value={parseInput(purpleInput)[2]}/>
                        <Square value={parseInput(purpleInput)[3]}/>
                    </div>
                </div>
            </div>
            <button>Shuffle: (todo)</button>
            <button onClick={() => parseDescriptions()}>Generate:</button>
        </div>
    )
}