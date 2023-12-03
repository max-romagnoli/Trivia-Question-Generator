import React, { useEffect, useState } from 'react';
import './scoreboard.css';
import * as config from './index.js'


export default function Scoreboard({setObjectBoard,objectBoard}){

  /*function calculateTotalScore() {
    if (!objectBoard) {
      return 0;
    }

    return objectBoard.players((total, player) => total + player.score, 0);
  }*/
  useEffect(() => {
    let url = config.BACKEND_ADDRESS + '/scores';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setObjectBoard(data.scores)
      console.log(data.scores)
      // Update your leaderboard state here
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, []);
  function renderObjectBoard(){
    if(objectBoard===0){
      return(<></>)
    }
    // Reverse the array to display newest highscores first

    return <>{objectBoard.map((item, index) => (
      <div key={index}>
        <p>{item.username}:{item.score}</p>
      </div>
    ))}</>
  }
  return(
    <div className='scoreboard'>
    <p1>High Scores</p1>
    <br />
    <br />
  
    <p2>{renderObjectBoard()}</p2>
    </div>
  )
}