export default function Mistakes({count}) {

    const getList = (num) => {
        const arr = []
        for(let i = 0; i < num; i++){
            arr.push(<div key={i}><span className={"dot"}/></div>)
        }
        return arr;
    }

    return (
        <div className={"mistakes"}>
            Mistakes remaining: {getList(count)}
        </div>

    )

}