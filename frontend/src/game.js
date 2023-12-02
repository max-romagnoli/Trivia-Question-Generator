import React, { useEffect, useState } from 'react';
import './game.css';
import * as config from './index.js'


//install react-router-dom
export default function Game({setReload}){
  //data struct to store and get player data
  //Todo give gamestate a proper name
  //gamestate: 0 loginPage, 1 gamepage, 2 lost page, 3 loading
  const [counter, setCounter] = useState(1)
  const [answer, setAnswer] = useState('')
  const [name,setName]=useState('')
  const [question, setQuestion] = useState('')
  const [gameState,setgameState]=useState(0)
  const [rightAnswer,setRightAnswer]=useState()
  const [score,setScore]=useState(0)
  const [questionValue, setQuestionValue]=useState(0)
  const handleChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

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
      setgameState(4)
    });

  }
  const fetchTriviaData = async () => {
    // Fetch data from the API
    const response = await fetch(config.BACKEND_ADDRESS + '/triviaquestion');
    const data = await response.json();
    setAnswer("")
    // Update game state based on fetched data
    setQuestion(data.triviaQuestion[0].question);
    setRightAnswer(data.triviaQuestion[0].answer);
    console.log(data.triviaQuestion[0].answer);
    setQuestionValue(data.triviaQuestion[0]?.value || 100);  
    // Set game state to 1 after fetching data
    setgameState(1);
  };
  const handleSubmit = async(event) => {
    if(gameState===0){ //currently in login
      console.log(name)
      setgameState(3)
      try {
        await fetchTriviaData();
      } catch (error) {
        console.error('Error fetching trivia data:', error);
        setgameState(4)
      }

    }
    if(gameState===1){//currently playing game
      console.log("Answer Given: "+answer)
      console.log("The Right Answer: '"+rightAnswer +"'")
      if(answer===rightAnswer){
        setScore(prev=>prev+questionValue)
        setCounter(prev=>prev+1)
        setgameState(3)
        try {
          await fetchTriviaData();
        } catch (error) {
          console.error('Error fetching trivia data:', error);
          setgameState(4)
        }

      }else{
        setgameState(2)
        try {
          await sendData()
          setReload(prev=>!prev)
        } catch (error) {
          console.error('Error sending data:', error);
        }
        setCounter(prev=>1)
        setScore(0)
      } 
    }
    if(gameState===2){ //currently on lost page
      setgameState(3)
      try {
        await fetchTriviaData();
      } catch (error) {
        console.error('Error fetching trivia data:', error);
        setgameState(4)
      }
    }
    if(gameState===4){ //fetching error
      try {
        await fetchTriviaData();
        await setgameState(1)
      } catch (error) {
        console.error('Error fetching trivia data:', error);
        setgameState(4)
      }
    }
    event.preventDefault();
  };
  const gamePage = (
    <div className="game-container">
      <h2>
        Question {counter}
        <br />
        Current score: {score}
      </h2>
      <h2>{question }</h2>
      <h3>{"Value: " + questionValue}</h3>
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
  const noBackend = (
    <div className="game-container">
      <h2>My brother, you forgot to start the server 💀💀💀</h2>
      <button onClick={handleSubmit}>Retry</button>
    </div>
  )
  const loadingPage = (
    <div className="game-container">
      <h2>
        Question is loading, be patient my friend
        <br />
      </h2>
    </div>
  )
  
  const gameEndPage = (
    <div className="game-container">
      <h2>
        Wrong Answer 😭
        <br/>
        The correct Answer was: {rightAnswer}
        <br/>
        <br />
        Start a new game?

        <br />
      </h2>
      <button onClick={handleSubmit}>retry?</button>
    </div>
  )
  return(
      <header className="App-header">
        <h1>TRIVIA GAME</h1>
        {(() => {
          switch(gameState) {
            case 0: return loginPage;
            case 1: return gamePage;
            case 2: return gameEndPage;
            case 3: return loadingPage;
            case 4: return noBackend;
            default: return noBackend;
          }
        })()}
      </header>
  )
}