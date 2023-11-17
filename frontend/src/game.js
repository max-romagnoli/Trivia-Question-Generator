import React, { useEffect, useState } from 'react';
//install react-router-dom
export default function Game({setObjectBoard}){
  //data struct to store and get player data
  
  const [counter, setCounter] = useState(1)
  const [answer, setAnswer] = useState('')
  const [isRunning,setIsRunning]=useState(true)
  let rightAnswer="rightAnswer"
  let question="test question"
  const handleChange = (event) => {
    setAnswer(event.target.value);
  };
  function changeisRunning(){
    setIsRunning(prev=>!prev)
  }
  const handleSubmit = (event) => {
    console.log('A answer was submitted' + answer);
    if(answer===rightAnswer){
      setCounter(prev=>prev+1)
      console.log("nice")
    }else{
      changeisRunning()
      let newScore = {name: "me", score: counter-1};
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
    event.preventDefault();
  };
  const gamePage=(
    <div>
      <h1>Question {counter}, Current score: {counter-1}</h1>
      <h2>{question}</h2> 
      <form onSubmit={handleSubmit}>
        <input type="text" value={answer} onChange={handleChange}/>     
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
  const gameEndPage=(<div>
    <p1>noob?, get good?</p1>
    <button onClick={changeisRunning}> retry?</button>    
    </div>)
  return(
      <header className="App-header">
        <h1>TRIVIA GAME</h1>
        {isRunning ? gamePage : gameEndPage}
      </header>
  )
}