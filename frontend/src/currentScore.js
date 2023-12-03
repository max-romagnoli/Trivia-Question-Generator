// currentScore.js
import React from 'react';
import './currentScore.css';

export default function currentScore({ counter }) {
  return (
    <div className="current-score-box">
      <p1>Current Score:
      <br />
      <br />
      </p1>
      <p2>{counter - 1}</p2>
    </div>
  );
}
