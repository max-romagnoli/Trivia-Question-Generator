import React, { useEffect, useState } from 'react';
import './game.css';
import axios from 'axios'
import CurrentScore from './currentScore';
import * as config from './index.js'


export default function Game({ setObjectBoard, onGameStateChange }) {
  
  const [style, setStyle] = useState({
    //fontSize: '8em',
    color: 'white',
    textShadow: '0 0 10px white',
    //border: '2px solid white',
    fontStyle: 'italic', // Added this line to set the initial font style
  });
  useEffect(() => {
    // Start the flashing interval
    const interval = setInterval(() => {

      setStyle((prevStyle) => ({
        color: prevStyle.color === '#8e3dff' ? 'white' : '#8e3dff',
        textShadow: prevStyle.textShadow === '0 0 10px #8e3dff' ? '0 0 10px white' : '0 0 10px #8e3dff',
        fontStyle: prevStyle.fontStyle === 'italic' ? 'italic' : 'italic', // Toggle between italic and normal

      }))
    }, 900);

    // Cleanup: Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [])


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
      setgameState(4)
    });

  }
  function test(){
    let url = config.BACKEND_ADDRESS + '/scores';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setObjectBoard(data)
      // Update your leaderboard state here
    })
    .catch((error) => {
      console.error('Error:', error);
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
        setgameState(2);
        onGameStateChange(2);
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

        <h5>
          Question {counter}
          <br />
          <br />
          <button onClick={test}>click me</button>
          </h5>
          <div className="question-box">
         <h2>
          Current score: 
          <br />
          {score}   
               
        </h2>
        
      </div>
      <br />

      <h2>{question + "(" + questionValue + ")"}</h2>
      <form onSubmit={handleSubmit} className="forms">
        <input type="text" value={answer} onChange={handleChangeAnswer} />
        <input type="submit" value="Submit" />
        
      </form>

    </div>
  );
  
  const loginPage = (
    <div className="game-container">
      <br />
      <br />
      <br />
      <br />
      <h2>What is your username:</h2>
      <br />
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
       <br />
      <div className="wrong-box">
        <h2>
        Wrong Answer
        <br />
      </h2>
      <h3>
        <br />
        You've made Steve upset :(
        <br/>
        <br/>
        </h3>
        <h5>
        The correct answer was: 
        </h5>
        <h4>
          {rightAnswer}
        </h4>

        <br/>
    </div>
    <br />
      <h2>  
        Start a new game?
        </h2>      
        <br />
      <button onClick={() => {
        setgameState(1);
        onGameStateChange(1);
      }}>retry?</button>
    </div>
  )
  return(
      <header className="App-header">
        <h1 style={style}>TRIVIA GAME</h1>
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