import React from "react"

export default function Answers(props){   

    const styles = 
    {backgroundColor: props.endGame ? 
        props.selection && !props.isCorrect ? "#F8BCBC" 
        : props.isCorrect ? "#94D7A2" : "white" 
        : props.selection ? "#D6DBF5" : "white",
    opacity: props.endGame ? !props.isCorrect ? "0.5" : 1 : 1}
    
    return (
        <div 
        className="answer"
        style={styles}
        onClick={()=> props.onClick(props.questionId, props.answer, props.isCorrect)}
        >
            <p>{props.answer}</p>
        </div> 
    )
}