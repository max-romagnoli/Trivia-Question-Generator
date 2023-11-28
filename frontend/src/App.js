import * as config from './index.js'
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Scoreboard from './scoreboard';
import Game from './game';
import CurrentScore from './currentScore';

function App() {
  //const [message,setMessage]=useState()
  //useEffect(()=> {
  //  axios
  //      .get( config.BACKEND_ADDRESS + "/flask/hello")                       // This for development
  //      .then(response => {
  //          console.log("SUCCESS", response)
  //          setMessage(response)
  //      })
  //      .catch(error => { console.log(error) })
  //}, [])

  //useEffect(()=> {
  //  axios
  //      .get('http://localhost:5000/flask/hello')                       // This for development
  //      /*.get('https://group-16-9bd3630a5775.herokuapp.com/flask/hello')*/ // This for deployment
  //      .then(response => {
  //          console.log("SUCCESS", response)
  //          setMessage(response)
  //      })
  //      .catch(error => { console.log(error) })
  //}, [])  *

  const [objectBoard,setObjectBoard]=useState(0);
  const [rightImage, setRightImage] = useState('/images/happySteve.png');

  const handleGameStateChange = (newState) => {
    if (newState === 2) {
      setRightImage('/images/upsetSteve.png');
    } else {
      setRightImage('/images/happySteve.png');
    }
  };

  return (
    <div className="App">
      <div className="left-side">
          <Scoreboard objectBoard={objectBoard}/>
      </div>
      <div className="middle-section">
        <Game setObjectBoard={setObjectBoard} onGameStateChange={handleGameStateChange} />
      </div>
      <div className="right-side">
        <img src={rightImage} alt={objectBoard} className="small-image"/>
      </div>
    </div>
  )
}

export default App;
