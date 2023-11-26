import React, { useEffect, useState } from 'react';
import './game.css';
import axios from 'axios'


//install react-router-dom
export default function Game({setObjectBoard}){
  //data struct to store and get player data
  
  const [counter, setCounter] = useState(1)
  const [answer, setAnswer] = useState('')
  const [name,setName]=useState('')
  const [question, setQuestion] = useState('')
  const [gameState,setgameState]=useState(0)
  const [rightAnswer,setRightAnswer]=useState()
  const handleChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  function changegameState(){
    setgameState(prev=>!prev)
  }
//  useEffect(() => {
//    localStorage.clear();
//    fetch('http://localhost:5000/triviaquestion')
//    .then(response => response.json())
//    .then(data => {
//        setQuestion(data.triviaQuestion[0].question);
//        console.log(question);
//        rightAnswer = data.triviaQuestion[0].answer;
//        console.log(rightAnswer)
//    })
//    .catch(error => console.error(error));
//  }, []);

  const handleSubmit = (event) => {
      fetch('http://localhost:5000/triviaquestion')
        .then(response => response.json())
        .then(data => {
          setQuestion(data.triviaQuestion[0].question); 
          setRightAnswer(data.triviaQuestion[0].answer);
          console.log(data.triviaQuestion[0].answer)
        })
        .catch(error => console.error(error))
    if(gameState===0){
      console.log(name)
      setgameState(1)
    }
    if(gameState===1){    
      console.log("answer"+answer)
      console.log("rightAnswer"+rightAnswer)
      if(answer===rightAnswer){
        setCounter(prev=>prev+1)
        
      }else{
        setgameState(2)
        let newScore = {name: name, score: counter-1};
        let retrievedLeaderboard;

        if (localStorage.getItem('players') === null) {
          // If 'players' key does not exist in localStorage, initialize retrievedLeaderboard with an empty players array
          retrievedLeaderboard = {players: []};
        } else {
          // If 'players' key exists in localStorage, retrieve the data
          retrievedLeaderboard = JSON.parse(localStorage.getItem('players'));
        }

        // Push newScore into the players array
        retrievedLeaderboard.players.push(newScore);
        // Store the updated data back into localStorage
        setObjectBoard(retrievedLeaderboard)
        localStorage.setItem('players', JSON.stringify(retrievedLeaderboard));
        setCounter(prev=>1)
      }
    }
    event.preventDefault();
  };
  const gamePage=(
    <div>
      <h1>Question {counter}, Current score: {counter-1}</h1>
      <h2>{question}</h2> 
      <form onSubmit={handleSubmit} className="forms">
        <input type="text" value={answer} onChange={handleChangeAnswer}/>     
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
  const loginPage=(
    <div>
      <h2>Add meg a neved:</h2>
      <form onSubmit={handleSubmit} className="forms">
          <input type="text" value={name} onChange={handleChangeName}/>     
          <input type="submit" value="Submit" />
      </form>
    </div>
  )
  const gameEndPage=(<div>
    <p1> giga noob?, get good?</p1>
    <button onClick={()=>setgameState(1)}> retry?</button>    
    </div>)
  return(
      <header className="App-header">
        <h1>TRIVIA GAME</h1>
        {gameState === 0 ? loginPage  : gameState === 1 ? gamePage  : gameEndPage }
      </header>
  )
}