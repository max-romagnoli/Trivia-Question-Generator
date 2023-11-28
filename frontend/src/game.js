import React, { useEffect, useState } from 'react';
import './game.css';
import axios from 'axios'
import CurrentScore from './currentScore';

export default function Game({ setObjectBoard, onGameStateChange }) {
  const [style, setStyle] = useState({
    fontSize: '6em',
    color: 'white',
    textShadow: '0 0 10px white',
    //border: '2px solid white',
    fontStyle: 'italic', // Added this line to set the initial font style
  });
  useEffect(() => {
    // Start the flashing interval
    const interval = setInterval(() => {

      setStyle((prevStyle) => ({
        fontSize: prevStyle.fontSize === '6em' ? '6em' : '6em',
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
  let worth=0
  const handleChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

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
      setAnswer("")
      //127.0.0.1:5000 --> for mac
      //localhost:5000 --> for windows
      fetch('http://127.0.0.1:5000/triviaquestion')
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
        setgameState(2);
        onGameStateChange(2);

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
      <div className="question-box">
        <h2>
          Question {counter}
        </h2>
      </div>
      <h2>{question + "(" + questionValue + ")"}</h2>
      <form onSubmit={handleSubmit} className="forms">
        <input type="text" value={answer} onChange={handleChangeAnswer} />
        <input type="submit" value="Submit" />
        
      </form>
      <br />
      <br />

      <CurrentScore counter={counter} />
    </div>
  );
  
  const loginPage = (
    <div className="game-container">
      <br />
      <br />
      <br />
      <br />
      <h2>What is your username:</h2>
      <form onSubmit={handleSubmit} className="forms">
        <input type="text" value={name} onChange={handleChangeName} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
  
  const gameEndPage = (
    <div className="game-container">
      <div className="wrong-box">
        <h2>
        Wrong Answer
        <br />
      </h2>
      <h3>
        <br />
        You've made Steve upset :(
        <br />
      </h3>
    </div>

      <h2>  
        Start a new game?
        <br />
        </h2>
      <button onClick={() => {
        setgameState(1);
        onGameStateChange(1);
      }}>retry?</button>
    </div>
  )
  return(
      <header className="App-header">
        <h1 style={style}>TRIVIA GAME</h1>
        {gameState === 0 ? loginPage  : gameState === 1 ? gamePage  : gameEndPage }

      </header>
  )
}