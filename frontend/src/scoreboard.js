import React, { useEffect, useState } from 'react';
import './scoreboard.css';
import * as config from './index.js'


export default function Scoreboard({reload}){
  const [scores, setScores] = useState([]);
  useEffect(() => {
    fetch(config.BACKEND_ADDRESS + '/scores')
      .then(response => response.json())
      .then(data => {
        console.log(data.scores); // This will print the scores to the console
        setScores(data.scores);
      })
      .then(console.log("done"))
      .catch(error => console.error('Failed to fetch scores:', error));
  }, [reload]);
  function renderObjectBoard(){
    // Reverse the array to display newest highscores first
    return <>{scores.map((player, index) => (
      <div key={index}>
        <span>{player.username}: </span>
        <span>{player.score}</span>
      </div>
    ))}</>
  }
  return(
    <div className='scoreboard'>
    <p1>High Scores
    <br />
    <br />
    </p1>
    <>{renderObjectBoard()}</>
    </div>
  )
}