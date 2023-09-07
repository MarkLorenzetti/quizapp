import React from "react"

export default function Intro(props){
    return (
        <div className="intro">
            <h1>Quizzical</h1>
            <h3>Answer multiple choice questions</h3>
            <form>
                <label htmlFor="numOfQuestions">Desired number of questions:</label>
                <input 
                type="number" 
                value={props.numOfQuestions}
                onChange={props.handleChange}
                name="numOfQuestions"/>
                <br />
                <label htmlFor="category">Select a category</label>
                <select 
                    id="category"
                    value={props.category}
                    onChange={props.handleChange}
                    name="category"
                    className="category"
                >
                    <option value="">Any Category</option>
                    <option value={9}>General Knowledge</option>
                    <option value={10}>Books</option>
                    <option value={11}>Film</option>
                    <option value={12}>Music</option>
                    <option value={13}>Musicals and Theatres</option>
                    <option value={14}>Television</option>
                    <option value={15}>Video Games</option>
                    <option value={16}>Board Games</option>
                    <option value={17}>Science and Nature</option>
                    <option value={18}>Computers</option>
                    <option value={19}>Mathematics</option>
                    <option value={20}>Mythology</option>
                    <option value={21}>Sports</option>
                    <option value={22}>Geography</option>
                    <option value={23}>History</option>
                    <option value={24}>Politics</option>
                    <option value={25}>Art</option>
                    <option value={26}>Celebtrities</option>
                    <option value={27}>Animals</option>
                    <option value={28}>Vehicles</option>
                    <option value={29}>Comics</option>
                    <option value={30}>Gadgets</option>
                    <option value={31}>Anime and Manga</option>
                    <option value={32}>Cartoons</option>
                    
                </select>
                <br />
                <label htmlFor="difficulty">Select a difficulty</label>
                <select 
                    id="favColor"
                    value={props.difficulty}
                    onChange={props.handleChange}
                    name="difficulty"
                >
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </form>
            <button className="submit-btn" onClick={props.visibility}>Start quiz</button>
        </div>
    )}