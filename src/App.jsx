import React from "react"
import Form from "./components/Form"
import Answer from "./components/Answer"
import Question from "./components/Question"
import {nanoid} from "nanoid"
import {shuffleArray, cleanHTML} from "./utils"

export default function App(){
    const [visibility, setVisibility] = React.useState(false)
    const [items, setItems] = React.useState([])
    const [userInput, setUserInput] = React.useState({})
    const [score, setScore] = React.useState(0)
    const [endGame, setEndGame] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)
    const [formData, setFormData] = React.useState(
        {numOfQuestions: 5, 
        difficulty: "",
        category: ""})
    const [completeAlert, setCompleteAlert] = React.useState(false)
    
    React.useEffect(()=>{
            fetch(`https://opentdb.com/api.php?amount=${formData.numOfQuestions}&type=multiple&difficulty=${formData.difficulty}&category=${formData.category}`)
            .then(res => res.json())
            .then(data => setItems(prevQuestions =>{
                return data.results.map(
                    questionObj => (
                        {
                        id: nanoid(),
                        category: questionObj.category,
                        question: questionObj.question,
                        correctAnswer: questionObj.correct_answer,
                        answers: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
                        }
                    ))        
                }))
        }, [visibility])
        
    function handleChange(event) {
        const {value, name} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
        
    function changeVisibility(){
        setVisibility(!visibility)
    }
    
    function handleClick(questionId, answer, isCorrect){
        setUserInput(prevInput => {
            if(!endGame){
                return {...prevInput, [questionId]: {answer: answer, isCorrect: isCorrect}}
            } else {
                return {...prevInput}
            }
        })
    }
    
    function checkSelection(questionId, answer){
        for (let key in userInput){
            if(userInput[key].answer === answer){
                return true
            } else {
                continue
            }
        }
    }
    
    function checkScore(){
       let correct = 0
       let wrong = 0
       
        for(let i in userInput){
            userInput[i].isCorrect ? correct += 1 : wrong += 1
        }
       
       if(correct + wrong !== items.length){
           setCompleteAlert(true)    
       } else {
           setCompleteAlert(false)
           setScore(correct)
           setEndGame(prevState => !prevState)
       }
    }
    
    function StartNewGame(){
        setItems([])
        setVisibility(false)
        setScore(0)
        setUserInput({})
        setEndGame(false)
        setNewGame(prevInput => !prevInput)
    }
    
    const questionItems = items.map(question => (
                
        <div className="question-and-answers" key={question.id}>
            <Question 
                question={cleanHTML(question.question)}
            />
            <div className="answers">
            {question.answers.map(answer => {
                return (
                <Answer
                    key={answer}
                    questionId={question.id}
                    answer={cleanHTML(answer)}
                    onClick={handleClick}
                    selection={checkSelection(question.id, answer)}
                    isCorrect={question.correctAnswer === answer}
                    endGame={endGame} />
            )}
            )}
            </div>
        </div>
    ))
        
    return (
        <main>
            {!visibility && 
            <Form
                visibility = {changeVisibility}
                numOfQuestions={formData.numOfQuestions}
                difficulty={formData.difficulty}
                handleChange={handleChange} 
            />}
            { visibility && <div className="container">
                <h1>Please answer the following questions</h1>
                {questionItems}
                <div className="endGame-elements">
                    {!endGame && <button className="submit-btn" onClick={checkScore}>SUBMIT</button>}
                    {endGame && <button onClick={StartNewGame} className="submit-btn">New Game</button>}
                    <div className="final-messages">
                        {endGame && <div className="final-score">Your score is: {score}/{items.length}
                        </div>}
                        {completeAlert && <div className="alert">You still have to answer some question...</div>}
                    </div>
                </div>
            </div>}
        </main>
    )
}


/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */
