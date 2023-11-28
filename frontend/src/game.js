import React, { useEffect, useState } from 'react';
import './game.css';
import * as config from './index.js'


//install react-router-dom
export default function Game({setObjectBoard}){
  //data struct to store and get player data
  
  const [counter, setCounter] = useState(1)
  const [answer, setAnswer] = useState('')
  const [name,setName]=useState('')
  const [question, setQuestion] = useState('')
  const [gameState,setgameState]=useState(0)
  const [rightAnswer,setRightAnswer]=useState()
  const [score,setScore]=useState(0)
  const [questionValue, setQuestionValue]=useState(0)
  let worth=0
  const handleChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

//  useEffect(() => {
//    localStorage.clear();
//    fetch(config.BACKEND_ADDRESS + '/triviaquestion')
//    .then(response => response.json())
//    .then(data => {
//        setQuestion(data.triviaQuestion[0].question);
//        console.log(question);
//        rightAnswer = data.triviaQuestion[0].answer;
//        console.log(rightAnswer)
//    })
//    .catch(error => console.error(error));
//  }, []);
  function sendData(){
    let url = config.BACKEND_ADDRESS + '/scores';
    let data = {username: name, value: score};
    console.log("sending this: name: "+name+" score: "+score)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });

  }
  const handleSubmit = (event) => {
      setAnswer("")
      //127.0.0.1:5000 --> for mac
      //localhost:5000 --> for windows
      fetch(config.BACKEND_ADDRESS + '/triviaquestion')
        .then(response => response.json())
        .then(data => {
          setQuestion(data.triviaQuestion[0].question); 
          setRightAnswer(data.triviaQuestion[0].answer);
          console.log(data.triviaQuestion[0].answer)
          setQuestionValue(data.triviaQuestion[0].value)
        })
        .catch(error => console.error(error))
    if(gameState===0){
      console.log(name)
      setgameState(1)
    }
    if(gameState===1){    
      console.log("Answer Given: "+answer)
      console.log("The Right Answer: '"+rightAnswer +"'")
      if(answer===rightAnswer){
        setScore(prev=>prev+questionValue)
        setCounter(prev=>prev+1)
        
      }else{
        setgameState(2)
        sendData()
        let newScore = {name: name, score: score};
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
        setScore(0)
      }
    }
    event.preventDefault();
  };
  const gamePage = (
    <div className="game-container">

      <button onClick={sendData}>remove me, this is just for testing sending data to db</button>

      <h2>
        Question {counter}
        <br />
        Current score: {counter - 1}
      </h2>
      <h2>{question + "(" + questionValue + ")"}</h2>
      <form onSubmit={handleSubmit} className="forms">
        <input type="text" value={answer} onChange={handleChangeAnswer} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
  
  const loginPage = (
    <div className="game-container">
      <h2>What is your username?:</h2>
      <form onSubmit={handleSubmit} className="forms">
        <input type="text" value={name} onChange={handleChangeName} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
  
  const gameEndPage = (
    <div className="game-container">
      <h2>
        Wrong Answer :(
        <br />
        Start a new game?
        <br />
        <br />
      </h2>
      <button onClick={() => setgameState(1)}>retry?</button>
    </div>
  )
  return(
      <header className="App-header">
        <h1>TRIVIA GAME</h1>
        {gameState === 0 ? loginPage  : gameState === 1 ? gamePage  : gameEndPage }
      </header>
  )
}