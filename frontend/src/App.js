import * as config from './index.js'
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Scoreboard from './scoreboard';
import Game from './game';
function App() {

  const [objectBoard,setObjectBoard]=useState(0);
  return (
    <div className="App">
      <div className="left-side">
          <Scoreboard objectBoard={objectBoard}/>
      </div>
      <div className="right-side">
        <Game setObjectBoard={setObjectBoard}/>
      </div>
    </div>
  )
}

export default App;
