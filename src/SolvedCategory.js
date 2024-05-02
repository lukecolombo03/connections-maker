export default function SolvedCategory({title, words, color, visible}) {

    // List of correct words in this category to display
    // Adds commas in between words
    const text = words.map((word, index) => {
        if (index === 3) {
            return word;
        }
        else {
            return word + ", ";
        }});

    if (visible) {
        return (
            <div className={`solved-display ${color}`}>
                <h4>{title}</h4>
                <div className={"solved-words"}>{text}</div>
            </div>
        )
    }

}