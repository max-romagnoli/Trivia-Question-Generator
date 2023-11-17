import React, { useEffect, useState } from 'react';
import './scoreboard.css';

export default function Scoreboard({objectBoard}){

  console.log("rerender")
  function renderObjectBoard(){
    if(objectBoard===0){
      return(<></>)
    }
    return <>{JSON.stringify(objectBoard)}</>
  }
  return(
    <div className='scoreboard'>
    <p1>Highscores</p1>
    <>{renderObjectBoard()}</>
    </div>
  )
}