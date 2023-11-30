import React, { useEffect, useState } from 'react';
import './scoreboard.css';
import * as config from './index.js'


export default function Scoreboard({objectBoard}){

  function renderObjectBoard(){
    if(objectBoard===0){
      return(<></>)
    }
    // Reverse the array to display newest highscores first
    const reversedPlayers = objectBoard.players.slice().reverse();

    return <>{reversedPlayers.map((player, index) => (
      <div key={index}>
        <span>{player.name}: </span>
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