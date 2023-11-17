import React, { useEffect, useState } from 'react';
import './scoreboard.css';

export default function Scoreboard({objectBoard}){

  console.log("rerender")
  return(
    <div className='scoreboard'>
    <p1>Highscores</p1>
    <p>{JSON.stringify(objectBoard[0])}</p>
    <p>{JSON.stringify(objectBoard)}</p>
    </div>
  )
}