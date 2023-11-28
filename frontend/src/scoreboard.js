import React, { useEffect, useState } from 'react';
import './scoreboard.css';

export default function Scoreboard({objectBoard}){

  function renderObjectBoard(){
    if(objectBoard===0){
      return(<></>)
    }
    // Reverse the array to display newest highscores first
    const reversedPlayers = objectBoard.players.slice().reverse();

    console.log(objectBoard.players[0].name)
    return <>{reversedPlayers.map((player, index) => (
      <div key={index}>
        <span>{player.name}: </span>
        <span>{player.score}</span>
      </div>
    ))}</>
  }
  return(
    <div className='scoreboard'>
    <p1>Highscores</p1>
    <>{renderObjectBoard()}</>
    </div>
  )
}