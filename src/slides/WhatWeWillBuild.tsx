import { Slide } from 'spectacle';
import './slides.css';

export function WhatWeWillBuild() {
  return (
    <Slide backgroundColor="#fff">
      <div className="center">
        <h3 style={{ marginRight: 32, verticalAlign: 'middle' }}>
          We'll build this
        </h3>
        <img
          src="https://i.imgur.com/zDDdy0P.jpg"
          alt="Example"
          width="500"
        ></img>
      </div>
    </Slide>
  );
}
