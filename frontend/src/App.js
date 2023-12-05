import * as config from './index.js'
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Scoreboard from './scoreboard';
import Game from './game';
import CurrentScore from './currentScore';

function App() {

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
          <Scoreboard setObjectBoard={setObjectBoard} objectBoard={objectBoard}/>
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

//        You've made Steve upset :(
