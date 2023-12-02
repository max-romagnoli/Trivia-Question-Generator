import * as config from './index.js'
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Scoreboard from './scoreboard';
import Game from './game';
function App() {

  const [reload,setReload]=useState(true);
  return (
    <div className="App">
      <div className="left-side">
          <Scoreboard reload={reload}/>
      </div>
      <div className="right-side">
        <Game setReload={setReload}/>
      </div>
    </div>
  )
}

export default App;
