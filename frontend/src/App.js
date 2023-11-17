import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Scoreboard from './scoreboard';
import Game from './game';
function App() {


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
  useEffect(() => {
    localStorage.clear();
  },[])
  const [objectBoard,setObjectBoard]=useState(0);
  console.log(objectBoard)
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
