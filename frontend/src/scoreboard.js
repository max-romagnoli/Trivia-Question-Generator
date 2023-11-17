import React, { useEffect, useState } from 'react';
import './scoreboard.css';

export default function Scoreboard({objectBoard}){

  console.log("rerender")
  function renderObjectBoard(){
    if(objectBoard===0){
      return(<></>)
    }
    console.log("e")
    console.log(objectBoard.players[0].name)
    return <>{objectBoard.players.map((player, index) => (
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