import React from "react"

export default function question(props){
    //console.log(props)
    return (
        <div className="question">
            <p>{props.question}</p>
        </div>
    )
}